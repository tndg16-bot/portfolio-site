#!/usr/bin/env node

/**
 * GitHub Actions監視スクリプト
 *
 * 機能:
 * - 失敗したワークフローの検出
 * - エラーログの解析
 * - Discord通知
 * - 自動修復（可能な場合）
 */

const { execSync } = require('child_process');
const https = require('https');

// 設定
const CONFIG = {
  REPO: process.env.GITHUB_REPOSITORY || 'tndg16-bot/portfolio-site',
  CHECK_HOURS: 1, // 過去1時間を監視
  DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL || '',
  DRY_RUN: process.env.DRY_RUN === 'true'
};

// エラーパターンの分析
const ERROR_PATTERNS = {
  TYPE_ERROR: {
    pattern: /Type error:/,
    severity: 'high',
    autoFixable: false,
    message: 'TypeScript型エラーが検出されました'
  },
  LINT_ERROR: {
    pattern: /Lint.*error/,
    severity: 'medium',
    autoFixable: true,
    message: 'Lintエラーが検出されました'
  },
  BUILD_ERROR: {
    pattern: /Build failed|Error: Command/,
    severity: 'high',
    autoFixable: false,
    message: 'ビルドエラーが検出されました'
  },
  DEPLOY_ERROR: {
    pattern: /deploy.*error|vercel.*error/i,
    severity: 'high',
    autoFixable: false,
    message: 'デプロイエラーが検出されました'
  },
  MISSING_FILE: {
    pattern: /ENOENT|no such file/i,
    severity: 'medium',
    autoFixable: false,
    message: 'ファイルが見つかりません'
  },
  DEPENDENCY_ERROR: {
    pattern: /npm ERR|package not found/i,
    severity: 'high',
    autoFixable: true,
    message: '依存関係のエラーが検出されました'
  }
};

/**
 * GitHub CLIで失敗したワークフローを取得
 */
function getFailedWorkflows() {
  try {
    const sinceDate = new Date(Date.now() - CONFIG.CHECK_HOURS * 60 * 60 * 1000);
    const since = sinceDate.toISOString();

    // gh CLIを使用して失敗したワークフローを取得
    const command = `gh run list --repo ${CONFIG.REPO} --json databaseId,status,conclusion,name,createdAt,headBranch,event,workflowName,headSha --limit 50`;
    const output = execSync(command, { encoding: 'utf-8' });

    const runs = JSON.parse(output);

    // 失敗した実行をフィルタリング
    const failedRuns = runs.filter(run => {
      const runDate = new Date(run.createdAt);
      return (
        run.status === 'completed' &&
        run.conclusion === 'failure' &&
        runDate >= sinceDate
      );
    });

    return failedRuns;
  } catch (error) {
    console.error('Failed to get workflows:', error.message);
    return [];
  }
}

/**
 * ワークフローのログを取得
 */
function getWorkflowLogs(runId) {
  try {
    const command = `gh run view ${runId} --repo ${CONFIG.REPO} --log-failed`;
    const logs = execSync(command, { encoding: 'utf-8' });
    return logs;
  } catch (error) {
    console.error(`Failed to get logs for run ${runId}:`, error.message);
    return '';
  }
}

/**
 * エラーログを解析
 */
function analyzeErrorLogs(logs) {
  const analysis = {
    errors: [],
    severity: 'low',
    autoFixable: false
  };

  for (const [key, pattern] of Object.entries(ERROR_PATTERNS)) {
    if (pattern.pattern.test(logs)) {
      analysis.errors.push({
        type: key,
        message: pattern.message,
        severity: pattern.severity,
        autoFixable: pattern.autoFixable
      });

      if (pattern.severity === 'high') {
        analysis.severity = 'high';
      } else if (pattern.severity === 'medium' && analysis.severity !== 'high') {
        analysis.severity = 'medium';
      }

      if (pattern.autoFixable) {
        analysis.autoFixable = true;
      }
    }
  }

  return analysis;
}

/**
 * Discord通知を送信
 */
function sendDiscordNotification(run, analysis) {
  if (!CONFIG.DISCORD_WEBHOOK_URL) {
    console.warn('DISCORD_WEBHOOK_URL not set, skipping notification');
    return;
  }

  if (CONFIG.DRY_RUN) {
    console.log('[DRY RUN] Would send Discord notification');
    return;
  }

  const severityEmoji = {
    high: '🔴',
    medium: '🟡',
    low: '🟢'
  };

  const errorMessages = analysis.errors
    .map(e => `- ${severityEmoji[e.severity]} ${e.message}`)
    .join('\n');

  const embed = {
    title: `🚨 GitHub Actions Failure: ${run.workflowName}`,
    color: analysis.severity === 'high' ? 16711680 : analysis.severity === 'medium' ? 16776960 : 65280,
    fields: [
      {
        name: 'Workflow',
        value: run.name,
        inline: true
      },
      {
        name: 'Branch',
        value: run.headBranch,
        inline: true
      },
      {
        name: 'Event',
        value: run.event,
        inline: true
      },
      {
        name: 'Severity',
        value: `${severityEmoji[analysis.severity]} ${analysis.severity.toUpperCase()}`,
        inline: true
      },
      {
        name: 'Auto-fixable',
        value: analysis.autoFixable ? '✅ Yes' : '❌ No',
        inline: true
      },
      {
        name: 'URL',
        value: `https://github.com/${CONFIG.REPO}/actions/runs/${run.databaseId}`,
        inline: false
      },
      {
        name: 'Errors',
        value: errorMessages || 'Unknown error',
        inline: false
      }
    ],
    timestamp: new Date().toISOString()
  };

  const payload = JSON.stringify({ embeds: [embed] });

  const url = new URL(CONFIG.DISCORD_WEBHOOK_URL);

  const options = {
    hostname: url.hostname,
    port: 443,
    path: url.pathname + url.search,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': payload.length
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`Discord API returned status ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(payload);
    req.end();
  });
}

/**
 * 自動修復を試みる
 */
function attemptAutoFix(run, analysis) {
  if (!analysis.autoFixable || CONFIG.DRY_RUN) {
    console.log('[AUTO-FIX] Skipped (not fixable or dry run)');
    return false;
  }

  console.log('[AUTO-FIX] Attempting automatic fix...');

  for (const error of analysis.errors) {
    if (!error.autoFixable) continue;

    try {
      switch (error.type) {
        case 'LINT_ERROR':
          // Lintエラーの自動修正を試みる
          console.log('[AUTO-FIX] Running: npm run lint -- --fix');
          execSync('npm run lint -- --fix', { encoding: 'utf-8' });
          console.log('[AUTO-FIX] Lint fixes applied');
          return true;

        case 'DEPENDENCY_ERROR':
          // 依存関係の再インストール
          console.log('[AUTO-FIX] Running: npm install');
          execSync('npm install', { encoding: 'utf-8' });
          console.log('[AUTO-FIX] Dependencies reinstalled');
          return true;

        default:
          console.log(`[AUTO-FIX] No auto-fix available for ${error.type}`);
      }
    } catch (error) {
      console.error(`[AUTO-FIX] Failed for ${error.type}:`, error.message);
    }
  }

  return false;
}

/**
 * メイン処理
 */
async function main() {
  console.log('='.repeat(50));
  console.log('GitHub Actions Monitor');
  console.log('='.repeat(50));
  console.log(`Repository: ${CONFIG.REPO}`);
  console.log(`Check period: ${CONFIG.CHECK_HOURS} hours`);
  console.log(`Dry run: ${CONFIG.DRY_RUN}`);
  console.log('='.repeat(50));

  // 失敗したワークフローを取得
  const failedRuns = getFailedWorkflows();

  if (failedRuns.length === 0) {
    console.log('✅ No failed workflows found');
    return;
  }

  console.log(`\n⚠️ Found ${failedRuns.length} failed workflow(s)\n`);

  // 各失敗したワークフローを処理
  for (const run of failedRuns) {
    console.log(`\nProcessing: ${run.workflowName} (${run.name})`);
    console.log(`  Branch: ${run.headBranch}`);
    console.log(`  Event: ${run.event}`);
    console.log(`  Run ID: ${run.databaseId}`);

    // ログを取得
    const logs = getWorkflowLogs(run.databaseId);

    if (!logs) {
      console.log('  ⚠️ Could not retrieve logs');
      continue;
    }

    // エラーを解析
    const analysis = analyzeErrorLogs(logs);

    console.log(`  Severity: ${analysis.severity}`);
    console.log(`  Errors: ${analysis.errors.length}`);
    console.log(`  Auto-fixable: ${analysis.autoFixable}`);

    // Discord通知を送信
    try {
      await sendDiscordNotification(run, analysis);
      console.log('  ✅ Discord notification sent');
    } catch (error) {
      console.error(`  ❌ Failed to send Discord notification: ${error.message}`);
    }

    // 自動修復を試みる
    if (analysis.autoFixable) {
      const fixed = attemptAutoFix(run, analysis);
      if (fixed) {
        console.log('  ✅ Auto-fix applied');
      }
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('Monitor completed');
  console.log('='.repeat(50));
}

// 実行
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
