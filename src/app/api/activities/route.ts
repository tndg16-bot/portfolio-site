import { NextResponse } from 'next/server';

// Environment variables for GitHub integration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'tndg16-bot';

interface GitHubCommit {
    sha: string;
    commit: {
        message: string;
        author: {
            name: string;
            date: string;
        };
    };
}

interface GitHubRepo {
    name: string;
}

interface Activity {
    date: string;
    message: string;
    type: 'milestone' | 'update' | 'completed';
    sha?: string;
    repoName?: string;
}

// アクティビティタイプを判定
function determineActivityType(message: string): 'milestone' | 'update' | 'completed' {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('feat:') || lowerMessage.includes('feature') || lowerMessage.includes('🚀')) {
        return 'milestone';
    }
    if (
        lowerMessage.includes('fix:') ||
        lowerMessage.includes('complete') ||
        lowerMessage.includes('close') ||
        lowerMessage.includes('✅')
    ) {
        return 'completed';
    }
    return 'update';
}

// コミットメッセージをフォーマット（コンベンショナルプレフィックスを削除）
function formatCommitMessage(message: string): string {
    return message
        .replace(/^(feat|fix|chore|docs|style|refactor|perf|test|build|ci|release)(\(.+?\))?:\s*/i, '')
        .replace(/^\s*[-:]\s*/, '') // 先頭のハイフンやコロンを削除
        .split('\n')[0] // 最初の行のみ
        .trim();
}

// 日付をフォーマット
function formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    return date.toISOString().split('T')[0]; // YYYY-MM-DD format
}

// 全リポジトリを取得
async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
    const url = `https://api.github.com/users/${GITHUB_OWNER}/repos?per_page=100&sort=updated`;
    const headers: HeadersInit = {
        Accept: 'application/vnd.github.v3+json',
    };
    if (GITHUB_TOKEN) {
        headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
    }

    const response = await fetch(url, {
        headers,
        next: { revalidate: 1800 }, // 30分ごとに再検証（更新頻度向上）
    });

    if (!response.ok) {
        console.error('GitHub repos API error:', response.status, response.statusText);
        return [];
    }

    return response.json();
}

// リポジトリのコミットを取得
async function fetchGitHubCommitsForRepo(repoName: string): Promise<GitHubCommit[]> {
    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${repoName}/commits?per_page=5`;
    const headers: HeadersInit = {
        Accept: 'application/vnd.github.v3+json',
    };

    if (GITHUB_TOKEN) {
        headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
    }

    const response = await fetch(url, {
        headers,
        next: { revalidate: 60 }, // 1分ごとに再検証（更新頻度向上）
    });

    if (!response.ok) {
        console.error(`GitHub commits API error for ${repoName}:`, response.status, response.statusText);
        return [];
    }

    return response.json();
}

export async function GET() {
    const startTime = Date.now();
    console.log('[API] /api/activities - Fetching GitHub commits...');

    try {
        // 全リポジトリを取得
        console.log('[API] Fetching repos...');
        const repos = await fetchGitHubRepos();
        console.log(`[API] Fetched ${repos.length} repos`);

        // 最近更新されたリポジトリ（上位10個）のコミットを取得
        const recentRepos = repos.slice(0, 10);
        console.log(`[API] Fetching commits from ${recentRepos.length} recent repos...`);

        // 各リポジトリのコミットを並列で取得
        const commitsArrays = await Promise.all(
            recentRepos.map((repo) => fetchGitHubCommitsForRepo(repo.name))
        );

        const allCommits = commitsArrays.flat();
        console.log(`[API] Total commits fetched: ${allCommits.length}`);

        // 全コミットをアクティビティに変換
        const activities: Activity[] = allCommits.map((commit, index) => {
            const repoName = recentRepos[Math.floor(index / 5)]?.name || 'unknown';
            const activityType = determineActivityType(commit.commit.message);
            return {
                date: formatDate(commit.commit.author.date),
                message: formatCommitMessage(commit.commit.message),
                type: activityType,
                sha: commit.sha.substring(0, 7),
                repoName: repoName,
            };
        });

        // 日付順にソート（新しい順）
        activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        // 最新50件に制限
        const latestActivities = activities.slice(0, 50);

        const duration = Date.now() - startTime;
        console.log(`[API] /api/activities - Success (${duration}ms)`);

        return NextResponse.json({
            success: true,
            activities: latestActivities,
            reposFetched: repos.length,
            commitsFetched: allCommits.length,
            lastUpdated: new Date().toISOString(),
            source: 'github-commits-all-repos',
            fetchDuration: duration
        });
    } catch (error) {
        const duration = Date.now() - startTime;
        console.error('[API] /api/activities - Error:', error);
        console.error('[API] Error details:', error instanceof Error ? error.stack : String(error));

        // フォールバックアクティビティ
        const fallbackActivities: Activity[] = [
            {
                date: '2026-01-16',
                message: 'Update blog post publication dates',
                type: 'completed',
                sha: 'abc1234',
                repoName: 'portfolio-site',
            },
            {
                date: '2026-01-16',
                message: 'Add project dashboard GitHub integration',
                type: 'milestone',
                sha: 'def5678',
                repoName: 'portfolio-site',
            },
            {
                date: '2026-01-15',
                message: 'Fix date validation logic',
                type: 'update',
                sha: 'ghi9012',
                repoName: 'portfolio-site',
            },
            {
                date: '2026-01-14',
                message: 'feat: Add dynamic repo fetching',
                type: 'update',
                sha: 'jkl3456',
                repoName: 'portfolio-site',
            },
            {
                date: '2026-01-13',
                message: 'Improve subtask parsing',
                type: 'update',
                sha: 'mno7890',
                repoName: 'portfolio-site',
            },
        ];

        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : String(error),
            activities: fallbackActivities,
            lastUpdated: new Date().toISOString(),
            source: 'fallback',
            fetchDuration: duration
        });
    }
}
