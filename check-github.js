const https = require('https');

// GitHub APIでリポジトリとIssuesを取得
function fetchGitHubData(username) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/users/${username}/repos?per_page=100&sort=updated`,
      method: 'GET',
      headers: {
        'User-Agent': 'Portfolio-Site'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

// Issue数を取得
async function getRepoIssues(username, repoName) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'api.github.com',
      path: `/repos/${username}/${repoName}/issues?state=open&per_page=100`,
      method: 'GET',
      headers: {
        'User-Agent': 'Portfolio-Site'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const issues = JSON.parse(data);
          if (Array.isArray(issues)) {
            resolve(issues);
          } else {
            resolve([]);
          }
        } catch (e) {
          resolve([]);
        }
      });
    });

    req.on('error', () => resolve([]));
    req.setTimeout(5000, () => { req.destroy(); resolve([]); });
    req.end();
  });
}

async function main() {
  const username = 'tndg16-bot';

  console.log('GitHubユーザー:', username);
  console.log('='.repeat(100));

  try {
    const repos = await fetchGitHubData(username);
    console.log(`リポジトリ数: ${repos.length}\n`);

    // Issueがあるリポジトリを抽出
    const reposWithIssues = repos.filter(r => r.open_issues_count > 0);
    console.log(`Issueがあるリポジトリ数: ${reposWithIssues.length}\n`);
    console.log('='.repeat(100));
    console.log('リポジトリ名                     | Issue数 | 最終更新');
    console.log('='.repeat(100));

    for (const repo of reposWithIssues.sort((a, b) => b.open_issues_count - a.open_issues_count).slice(0, 20)) {
      console.log(`${repo.name.padEnd(35)} | ${String(repo.open_issues_count).padStart(6)} | ${repo.updated_at.split('T')[0]}`);
    }

    // Issueの詳細を取得（最初の5つのリポジトリ）
    console.log('\n' + '='.repeat(100));
    console.log('Issue詳細（最初の5リポジトリ）:');
    console.log('='.repeat(100));

    for (const repo of reposWithIssues.slice(0, 5)) {
      const issues = await getRepoIssues(username, repo.name);
      console.log(`\n${repo.name} (${repo.open_issues_count} issues):`);
      issues.slice(0, 5).forEach(issue => {
        console.log(`  #${issue.number}: ${issue.title}`);
        if (issue.labels && issue.labels.length > 0) {
          console.log(`    Labels: ${issue.labels.map(l => l.name).join(', ')}`);
        }
      });
    }

  } catch (error) {
    console.error('エラー:', error.message);
  }
}

main();
