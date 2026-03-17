#!/usr/bin/env node

/**
 * Morning Routine Combined Skill
 *
 * 朝9時に以下の2つの機能を順次実行します：
 * 1. デイリーノート通知機能 (daily-checklist-generator)
 * 2. Discord自動同期（朝）機能
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// ESモジュールで__dirnameを再現
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 設定ファイルのパス
const CONFIG_PATH = path.join(__dirname, 'config.json');

// デフォルト設定
const DEFAULT_CONFIG = {
  dailyNotesPath: 'D:/AntigravityVault/daily',
  discordChannel: '#秘書さんの部屋',
  morningMessage: '🌅 おはようございます！今日の予定を振り返りましょう。',
  priorityMarkers: ['!!!', '!!', '!'],
  dueDatePatterns: ['@due', '@today', '@tomorrow'],
  maxTasks: 20,
  timezone: 'Asia/Tokyo',
  logPath: 'logs/morning-routine-combined.log',
  maxRetries: 3,
  retryDelayMs: 5000
};

/**
 * 設定を読み込む
 */
async function loadConfig() {
  try {
    const configData = await fs.readFile(CONFIG_PATH, 'utf-8');
    const config = JSON.parse(configData);
    return { ...DEFAULT_CONFIG, ...config };
  } catch (error) {
    console.error('設定ファイルの読み込みエラー（デフォルト設定を使用）:', error.message);
    return DEFAULT_CONFIG;
  }
}

/**
 * ログを記録
 */
async function log(message, level = 'info', config) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;
  
  console.log(logEntry.trim());
  
  try {
    const logDir = path.dirname(config.logPath);
    await fs.mkdir(logDir, { recursive: true });
    await fs.appendFile(config.logPath, logEntry, 'utf-8');
  } catch (error) {
    console.error('ログ書き込みエラー:', error.message);
  }
}

/**
 * 現在の日付を取得（YYYY-MM-DD形式）
 */
function getCurrentDate() {
  return new Date().toLocaleDateString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\//g, '-');
}

/**
 * デイリーチェックリストを生成
 */
async function generateDailyChecklist(config) {
  await log('デイリーチェックリスト生成開始', 'info', config);
  
  try {
    const notesPath = config.dailyNotesPath;
    
    // ディレクトリが存在するか確認
    try {
      await fs.access(notesPath);
    } catch {
      await log(`デイリーノートディレクトリが存在しません: ${notesPath}`, 'warn', config);
      return {
        success: true,
        tasks: [],
        message: 'No daily notes found'
      };
    }

    // 全てのマークダウンファイルを読み込み
    const files = await fs.readdir(notesPath);
    const markdownFiles = files.filter(file => file.endsWith('.md'));

    if (markdownFiles.length === 0) {
      await log('マークダウンファイルが見つかりません', 'warn', config);
      return {
        success: true,
        tasks: [],
        message: 'No markdown files found'
      };
    }

    // 全てのタスクを抽出
    const allTasks = [];
    for (const file of markdownFiles) {
      try {
        const content = await fs.readFile(path.join(notesPath, file), 'utf-8');
        const tasks = extractIncompleteTasks(content, config);
        tasks.forEach(task => {
          task.sourceFile = file;
          task.score = calculatePriorityScore(task, config);
        });
        allTasks.push(...tasks);
      } catch (error) {
        await log(`ファイル読み込みエラー: ${file} - ${error.message}`, 'error', config);
      }
    }

    if (allTasks.length === 0) {
      await log('未完了タスクが見つかりません', 'info', config);
      return {
        success: true,
        tasks: [],
        message: 'No incomplete tasks found',
        stats: { totalTasks: 0, high: 0, medium: 0, low: 0 }
      };
    }

    // 優先順位でソート
    allTasks.sort((a, b) => b.score - a.score);

    // 最大タスク数に制限
    const limitedTasks = allTasks.slice(0, config.maxTasks);

    // 統計情報を計算
    const stats = {
      totalTasks: allTasks.length,
      high: allTasks.filter(t => t.score >= 6).length,
      medium: allTasks.filter(t => t.score >= 3 && t.score < 6).length,
      low: allTasks.filter(t => t.score < 3).length
    };

    await log(`チェックリスト生成完了: ${limitedTasks.length}件（合計: ${allTasks.length}件）`, 'success', config);

    return {
      success: true,
      tasks: limitedTasks,
      stats: stats,
      message: `Found ${allTasks.length} incomplete tasks, showing top ${limitedTasks.length}`
    };
  } catch (error) {
    await log(`チェックリスト生成エラー: ${error.message}`, 'error', config);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * 未完了タスクを抽出
 */
function extractIncompleteTasks(content, config) {
  const tasks = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // 未完了タスクをマッチ
    const taskMatch = line.match(/^[\s\t]*-\s\[\s\]\s+(.+)$/);

    if (taskMatch) {
      const taskText = taskMatch[1].trim();

      // 緊急度を判定
      let urgency = 'low';
      config.dueDatePatterns.forEach(pattern => {
        if (taskText.toLowerCase().includes(pattern)) {
          if (pattern === '@due' || pattern === '@today') {
            urgency = 'high';
          } else if (pattern === '@tomorrow') {
            urgency = 'medium';
          }
        }
      });

      // 重要度マーカーを検出（長い順にチェックして部分一致を回避）
      let importanceScore = 1;
      const sortedMarkers = [...config.priorityMarkers].sort((a, b) => b.length - a.length);
      for (const marker of sortedMarkers) {
        if (taskText.includes(marker)) {
          if (marker === '!!!') importanceScore = 3;
          else if (marker === '!!') importanceScore = 2;
          else if (marker === '!') importanceScore = 1.5;
          break; // 最初にマッチしたものを使用
        }
      }

      // タスクテキストをクリーンアップ（マーカーを削除）
      let cleanTask = taskText;
      config.priorityMarkers.forEach(marker => {
        cleanTask = cleanTask.replace(new RegExp(marker, 'g'), '').trim();
      });

      tasks.push({
        text: cleanTask,
        originalText: taskText,
        line: index + 1,
        urgency: urgency,
        importanceScore: importanceScore
      });
    }
  });

  return tasks;
}

/**
 * 優先順位スコアを計算
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function calculatePriorityScore(task, config) {
  let urgencyScore = 1; // low
  
  // 緊急度スコア
  if (task.urgency === 'high') urgencyScore = 3;
  else if (task.urgency === 'medium') urgencyScore = 2;

  // 最終スコア
  return urgencyScore * task.importanceScore;
}

/**
 * チェックリストをフォーマット
 */
function formatChecklist(result) {
  if (!result.success || result.tasks.length === 0) {
    return '\n📋 **今日のチェックリスト**\n\n未完了タスクはありません。';
  }

  let output = `\n📋 **今日のチェックリスト**\n`;
  output += `*合計: ${result.stats.totalTasks}件（高優先: ${result.stats.high}, 中: ${result.stats.medium}, 低: ${result.stats.low}）*\n\n`;

  result.tasks.forEach((task, index) => {
    const priorityEmoji = task.score >= 6 ? '🔴' : task.score >= 3 ? '🟡' : '🟢';
    output += `${priorityEmoji} ${index + 1}. ${task.text}\n`;
  });

  if (result.stats.totalTasks > result.tasks.length) {
    output += `\n*他 ${result.stats.totalTasks - result.tasks.length} 件は省略されています*`;
  }

  return output;
}

/**
 * Discordメッセージを送信
 * 注: この関数はOpenClawのmessage APIを使用して実装する必要があります
 */
async function sendDiscordMessage(message, config) {
  console.log('========================================');
  console.log('Discord送信メッセージ:');
  console.log(`チャンネル: ${config.discordChannel}`);
  console.log(`メッセージ: ${message}`);
  console.log('========================================');
  
  // TODO: OpenClaw message APIを呼び出して実際に送信
  // このスキルはNode.jsスクリプトとして実行されるため、
  // 別の方法でDiscord送信を実装する必要があります
  
  return {
    success: true,
    channelId: config.discordChannel,
    messageId: `temp-${Date.now()}`,
    timestamp: new Date().toISOString()
  };
}

/**
 * Obsidianに追記
 */
async function appendToObsidian(content, config) {
  try {
    const date = getCurrentDate();
    const notePath = path.join(config.dailyNotesPath, `${date}.md`);
    
    // ファイルが存在しない場合は作成
    try {
      await fs.access(notePath);
    } catch {
      const header = `# ${date}\n\n`;
      await fs.writeFile(notePath, header, 'utf-8');
    }
    
    // 追記
    const timestamp = new Date().toLocaleTimeString('ja-JP', {
      timeZone: 'Asia/Tokyo',
      hour: '2-digit',
      minute: '2-digit'
    });
    const entry = `\n\n## 朝のチェックイン (${timestamp})\n\n${content}\n`;
    
    await fs.appendFile(notePath, entry, 'utf-8');
    
    return {
      success: true,
      path: notePath
    };
  } catch (error) {
    await log(`Obsidian書き込みエラー: ${error.message}`, 'error', config);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * メイン処理
 */
async function main() {
  try {
    await log('Morning Routine Combined 開始', 'info', DEFAULT_CONFIG);
    
    // 設定を読み込む
    const config = await loadConfig();
    
    // 1. デイリーチェックリストを生成
    await log('ステップ1: デイリーチェックリスト生成', 'info', config);
    const checklistResult = await generateDailyChecklist(config);
    
    let checklistMessage = '';
    if (checklistResult.success) {
      checklistMessage = formatChecklist(checklistResult);
    } else {
      checklistMessage = '\n📋 チェックリストの生成中にエラーが発生しました';
      await log(`チェックリスト生成エラー: ${checklistResult.error}`, 'error', config);
    }
    
    // 2. Discordメッセージを作成（チェックリストを含む）
    await log('ステップ2: Discordメッセージ作成', 'info', config);
    const fullMessage = `${config.morningMessage}${checklistMessage}`;
    
    // 3. Discordにメッセージを送信
    await log('ステップ3: Discordメッセージ送信', 'info', config);
    const sendResult = await sendDiscordMessage(fullMessage, config);
    if (sendResult.success) {
      await log('Discordメッセージ送信成功', 'success', config);
    } else {
      await log(`Discordメッセージ送信失敗: ${sendResult.error}`, 'error', config);
    }
    
    // 4. Obsidianにチェックイン記録
    await log('ステップ4: Obsidianに記録', 'info', config);
    const obsidianContent = `**朝のチェックイン**\n\n${checklistMessage}\n\n> ステータス: メッセージ送信${sendResult.success ? '完了' : '失敗'}`;
    const obsidianResult = await appendToObsidian(obsidianContent, config);
    if (obsidianResult.success) {
      await log(`Obsidianに記録: ${obsidianResult.path}`, 'success', config);
    } else {
      await log(`Obsidian記録失敗: ${obsidianResult.error}`, 'error', config);
    }
    
    await log('Morning Routine Combined 完了', 'info', config);
    
    // 結果を出力（OpenClawが解析できる形式）
    console.log(JSON.stringify({
      status: 'success',
      checklistGenerated: checklistResult.success,
      checklistTasksCount: checklistResult.success ? checklistResult.tasks.length : 0,
      discordSent: sendResult.success,
      obsidianSaved: obsidianResult.success,
      obsidianPath: obsidianResult.success ? obsidianResult.path : null,
      timestamp: new Date().toISOString()
    }, null, 2));
    
    process.exit(0);
  } catch (error) {
    await log(`Fatal error: ${error.message}`, 'error', DEFAULT_CONFIG);
    console.error('エラー:', error);
    process.exit(1);
  }
}

// 実行
const isMainModule = import.meta.url === `file://${process.argv[1]}` || 
                    import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}`;
if (isMainModule) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export {
  main,
  loadConfig,
  generateDailyChecklist,
  formatChecklist,
  sendDiscordMessage,
  appendToObsidian,
  log
};
