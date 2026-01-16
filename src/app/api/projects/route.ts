import { NextResponse } from 'next/server';

// Environment variables for GitHub integration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'tndg16-bot';

interface GitHubIssue {
    number: number;
    title: string;
    state: string;
    labels: { name: string }[];
    body: string | null;
    html_url: string;
    repository_url: string;
    created_at: string;
    updated_at: string;
}

interface GitHubRepo {
    name: string;
    full_name: string;
    open_issues_count: number;
}

interface Subtask {
    title: string;
    completed: boolean;
}

interface Project {
    name: string;
    repoName: string;
    status: 'not_started' | 'in_progress' | 'completed';
    description?: string;
    issueNumber?: number;
    issueUrl?: string;
    subtasks?: Subtask[];
    progress?: number;
}

interface Stats {
    total: number;
    inProgress: number;
    completed: number;
    notStarted: number;
}

// GitHub APIから全リポジトリを取得
async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
    const url = `https://api.github.com/users/${GITHUB_OWNER}/repos?per_page=100&sort=updated`;
    const headers: HeadersInit = {
        'Accept': 'application/vnd.github.v3+json',
    };
    if (GITHUB_TOKEN) {
        headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
    }

    const response = await fetch(url, {
        headers,
        next: { revalidate: 3600 } // 1時間ごとに再検証
    });

    if (!response.ok) {
        console.error('GitHub repos API error:', response.status, response.statusText);
        return [];
    }

    return response.json();
}

// リポジトリのIssuesを取得
async function fetchGitHubIssuesForRepo(repoName: string): Promise<GitHubIssue[]> {
    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${repoName}/issues?state=all&per_page=100`;
    const headers: HeadersInit = {
        'Accept': 'application/vnd.github.v3+json',
    };
    if (GITHUB_TOKEN) {
        headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
    }

    const response = await fetch(url, {
        headers,
        next: { revalidate: 300 } // 5分ごとに再検証
    });

    if (!response.ok) {
        console.error(`GitHub issues API error for ${repoName}:`, response.status);
        return [];
    }

    const issues = await response.json();
    // PRを除外
    if (Array.isArray(issues)) {
        return issues.filter((issue: any) => !issue.hasOwnProperty('pull_request'));
    }
    return [];
}

// Issueボディからサブタスクをパース（チェックボックス形式）
function parseSubtasks(body: string | null): Subtask[] {
    if (!body) return [];

    const subtasks: Subtask[] = [];
    // GitHubのチェックボックス形式: - [x] タイトル または - [ ] タイトル
    const regex = /^\s*[-*]\s+\[([ xX])\]\s*(.+)/gm;
    let match;

    while ((match = regex.exec(body)) !== null) {
        subtasks.push({
            completed: match[1].toLowerCase() === 'x',
            title: match[2].trim()
        });
    }

    return subtasks;
}

// Issueのステータスを判定
function parseIssueStatus(issue: GitHubIssue): 'not_started' | 'in_progress' | 'completed' {
    // Issueがclosedなら完了
    if (issue.state === 'closed') return 'completed';

    const subtasks = parseSubtasks(issue.body);
    const completedCount = subtasks.filter(t => t.completed).length;

    // サブタスクがある場合、進行状況をサブタスクから判定
    if (subtasks.length > 0) {
        if (completedCount === subtasks.length) return 'completed';
        if (completedCount > 0) return 'in_progress';
    }

    // ラベルからステータスを判定
    const inProgressLabels = ['in-progress', 'in progress', 'wip', 'doing', 'active', 'processing'];
    const hasInProgressLabel = issue.labels.some(label =>
        inProgressLabels.includes(label.name.toLowerCase())
    );

    if (hasInProgressLabel) return 'in_progress';

    // タイトルから進捗を抽出 [3/5] 形式
    const progressMatch = issue.title.match(/\[(\d+)\/(\d+)\]/);
    if (progressMatch) {
        const current = parseInt(progressMatch[1]);
        const total = parseInt(progressMatch[2]);
        if (current > 0 && current < total) return 'in_progress';
        if (current >= total) return 'completed';
    }

    return 'not_started';
}

// リポジトリ名をIssueタイトルから抽出
function extractRepoNameFromTitle(title: string): string | null {
    const match = title.match(/^\[([a-zA-Z0-9_-]+)\]/);
    return match ? match[1] : null;
}

// Issueからプロジェクト情報に変換
function convertIssueToProject(issue: GitHubIssue, repoName: string): Project {
    // タイトルの先頭にあるリポジトリ名タグを除去
    let cleanTitle = issue.title;
    const repoTag = extractRepoNameFromTitle(issue.title);
    if (repoTag) {
        cleanTitle = cleanTitle.replace(/^\[[a-zA-Z0-9_-]+\]\s*/, '');
    }

    const subtasks = parseSubtasks(issue.body);
    const completedCount = subtasks.filter(t => t.completed).length;
    const progress = subtasks.length > 0
        ? Math.round((completedCount / subtasks.length) * 100)
        : 0;

    return {
        name: cleanTitle,
        repoName: repoName,
        status: parseIssueStatus(issue),
        description: issue.body?.slice(0, 150) || undefined,
        issueNumber: issue.number,
        issueUrl: issue.html_url,
        subtasks,
        progress
    };
}

export async function GET() {
    try {
        // 全リポジトリを取得
        const repos = await fetchGitHubRepos();

        // Issueがあるリポジトリのみを対象に（オプション）
        const reposWithIssues = repos.filter(repo => repo.open_issues_count > 0);

        // 各リポジトリのIssuesを並列で取得
        const allIssues = await Promise.all(
            reposWithIssues.map(repo => fetchGitHubIssuesForRepo(repo.name))
        );

        const issues = allIssues.flat();

        // 全Issuesをプロジェクトに変換
        const projects: Project[] = issues.map(issue => {
            const repoName = issue.repository_url.split('/').pop() || 'unknown';
            return convertIssueToProject(issue, repoName);
        });

        // 統計を算出
        const stats: Stats = {
            total: projects.length,
            inProgress: projects.filter(p => p.status === 'in_progress').length,
            completed: projects.filter(p => p.status === 'completed').length,
            notStarted: projects.filter(p => p.status === 'not_started').length,
        };

        return NextResponse.json({
            success: true,
            projects,
            stats,
            reposFetched: repos.length,
            reposWithIssues: reposWithIssues.length,
            lastUpdated: new Date().toISOString(),
            source: 'github-issues'
        });
    } catch (error) {
        console.error('Error fetching GitHub issues:', error);

        // エラー時はモックデータを返す
        const fallbackProjects: Project[] = [
            {
                name: 'ノウハウ依存脱却ワークシートの開発',
                repoName: 'portfolio-site',
                status: 'in_progress' as const,
                issueNumber: 6,
                issueUrl: 'https://github.com/tndg16-bot/portfolio-site/issues/6',
                progress: 50,
                subtasks: [
                    { title: 'ワークシート設計', completed: true },
                    { title: 'プロトタイプ作成', completed: false }
                ]
            },
            {
                name: '自己肯定感の源泉発見セッション',
                repoName: 'portfolio-site',
                status: 'not_started' as const,
                issueNumber: 7,
                issueUrl: 'https://github.com/tndg16-bot/portfolio-site/issues/7',
                progress: 0,
                subtasks: []
            },
        ];

        return NextResponse.json({
            success: true,
            projects: fallbackProjects,
            stats: {
                total: fallbackProjects.length,
                inProgress: fallbackProjects.filter(p => p.status === 'in_progress').length,
                completed: fallbackProjects.filter(p => p.status === 'completed').length,
                notStarted: fallbackProjects.filter(p => p.status === 'not_started').length,
            },
            lastUpdated: new Date().toISOString(),
            source: 'fallback'
        });
    }
}
