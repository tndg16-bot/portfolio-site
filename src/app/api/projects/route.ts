import { NextResponse } from 'next/server';

// Environment variables for GitHub integration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'tndg16-bot';
const GITHUB_REPOS = [
    'papa',
    'nihongo-mate',
    'gamified-mandala-chart',
    'kindle-pdf-extension',
    'portfolio-site',
    'gamified-mandala'
];

interface GitHubIssue {
    number: number;
    title: string;
    state: string;
    labels: { name: string }[];
    body: string | null;
}

interface Subtask {
    title: string;
    completed: boolean;
}

interface Project {
    name: string;
    status: 'not_started' | 'in_progress' | 'completed';
    description?: string;
    issueNumber?: number;
    subtasks?: Subtask[];
    progress?: number;
}

interface Stats {
    total: number;
    inProgress: number;
    completed: number;
    notStarted: number;
}

function parseSubtasks(body: string | null): Subtask[] {
    if (!body) return [];

    // Improved regex to support both '-' and '*' and handle different spacing
    const regex = /^[*-]\s*\[([ xX])\]\s*(.+)/gm;
    const subtasks: Subtask[] = [];
    let match;

    while ((match = regex.exec(body)) !== null) {
        subtasks.push({
            completed: match[1].toLowerCase() === 'x',
            title: match[2].trim()
        });
    }
    return subtasks;
}

function parseIssueStatus(issue: GitHubIssue): 'not_started' | 'in_progress' | 'completed' {
    if (issue.state === 'closed') return 'completed';

    const subtasks = parseSubtasks(issue.body);
    const completedCount = subtasks.filter(t => t.completed).length;

    // If there are subtasks and some are done, it's in progress
    if (subtasks.length > 0 && completedCount > 0 && completedCount < subtasks.length) {
        return 'in_progress';
    }

    const inProgressLabels = ['in-progress', 'in progress', 'wip', 'doing', 'active', 'processing'];
    const hasInProgressLabel = issue.labels.some(label =>
        inProgressLabels.includes(label.name.toLowerCase())
    );

    if (hasInProgressLabel) return 'in_progress';

    // Title status check [1/5] etc
    const progressMatch = issue.title.match(/\[(\d+)\/(\d+)\]/);
    if (progressMatch) {
        const current = parseInt(progressMatch[1]);
        const total = parseInt(progressMatch[2]);
        if (current > 0 && current < total) return 'in_progress';
        if (current >= total) return 'completed';
    }

    return 'not_started';
}

async function fetchGitHubIssuesForRepo(repo: string): Promise<GitHubIssue[]> {
    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${repo}/issues?state=all&per_page=50`;
    const headers: HeadersInit = {
        'Accept': 'application/vnd.github.v3+json',
    };
    if (GITHUB_TOKEN) headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;

    const response = await fetch(url, { headers, cache: 'no-store' });
    if (!response.ok) return [];
    return response.json();
}

async function fetchGitHubIssues(): Promise<GitHubIssue[]> {
    const allIssues = await Promise.all(GITHUB_REPOS.map(repo => fetchGitHubIssuesForRepo(repo)));
    const issues = allIssues.flat();

    return issues.filter(issue =>
        !issue.hasOwnProperty('pull_request') && // Filter out PRs
        (
            issue.title.match(/^\[M\d+\]/) ||
            issue.title.match(/^\[PROJECT\]/i) ||
            issue.title.match(/^\[FEATURE\]/i) ||
            issue.title.match(/^\[WIP\]/i) ||
            issue.labels.some(l => ['project', 'feature', 'milestone'].includes(l.name.toLowerCase()))
        )
    );
}

function parseGitHubIssues(issues: GitHubIssue[]): { projects: Project[]; stats: Stats } {
    const projects: Project[] = issues.map(issue => {
        const cleanName = issue.title
            .replace(/^\[M\d+\]\s*/, '')
            .replace(/^\[PROJECT\]\s*/i, '')
            .replace(/^\[FEATURE\]\s*/i, '')
            .replace(/^\[WIP\]\s*/i, '')
            .replace(/^\[Portfolio\]\s*/, '')
            .replace(/^\[Infra\]\s*/, '');

        const subtasks = parseSubtasks(issue.body);
        const completedCount = subtasks.filter(t => t.completed).length;
        const progress = subtasks.length > 0
            ? Math.round((completedCount / subtasks.length) * 100)
            : 0;

        return {
            name: cleanName,
            status: parseIssueStatus(issue),
            description: issue.body?.slice(0, 100) || undefined,
            issueNumber: issue.number,
            subtasks,
            progress
        };
    });

    const stats: Stats = {
        total: projects.length,
        inProgress: projects.filter(p => p.status === 'in_progress').length,
        completed: projects.filter(p => p.status === 'completed').length,
        notStarted: projects.filter(p => p.status === 'not_started').length,
    };

    return { projects, stats };
}

export async function GET() {
    try {
        const issues = await fetchGitHubIssues();
        const { projects, stats } = parseGitHubIssues(issues);

        return NextResponse.json({
            success: true,
            projects,
            stats,
            lastUpdated: new Date().toISOString(),
            source: 'github-issues'
        });
    } catch (error) {
        console.error('Error fetching GitHub issues:', error);


        // Return mock data for development/fallback
        const fallbackProjects: Project[] = [
            {
                name: 'ノウハウ依存脱却ワークの開発',
                status: 'in_progress' as const,
                issueNumber: 6,
                progress: 50,
                subtasks: [
                    { title: 'ワークシート設計', completed: true },
                    { title: 'プロトタイプ作成', completed: false }
                ]
            },
            {
                name: '自己肯定感の源泉発見セッション',
                status: 'not_started' as const,
                issueNumber: 7,
                progress: 0,
                subtasks: []
            },
            {
                name: '過去の解釈変換メソッド',
                status: 'not_started' as const,
                issueNumber: 8,
                progress: 0,
                subtasks: []
            },
            {
                name: '人は人を通して磨かれる',
                status: 'not_started' as const,
                issueNumber: 9,
                progress: 0,
                subtasks: []
            },
            {
                name: '独自の商品設計',
                status: 'not_started' as const,
                issueNumber: 10,
                progress: 0,
                subtasks: []
            },
            {
                name: '案件獲得戦略',
                status: 'not_started' as const,
                issueNumber: 11,
                progress: 0,
                subtasks: []
            },
            {
                name: '最速収益化ロードマップ',
                status: 'not_started' as const,
                issueNumber: 12,
                progress: 0,
                subtasks: []
            },
            {
                name: '本業×副業統合戦略',
                status: 'not_started' as const,
                issueNumber: 13,
                progress: 0,
                subtasks: []
            },
            {
                name: 'Claude Code並列開発',
                status: 'in_progress' as const,
                issueNumber: 14,
                progress: 60,
                subtasks: [
                    { title: 'ドキュメント作成', completed: true },
                    { title: 'トレーニング', completed: true },
                    { title: '実践テスト', completed: true },
                    { title: '振り返り', completed: false },
                    { title: '最終化', completed: false }
                ]
            },
            {
                name: 'Git/GitHub連携',
                status: 'not_started' as const,
                issueNumber: 15,
                progress: 0,
                subtasks: []
            },
            {
                name: 'ポートフォリオサイト完成',
                status: 'completed' as const,
                issueNumber: 1,
                progress: 100,
                subtasks: [
                    { title: '要件定義', completed: true },
                    { title: 'デザイン', completed: true },
                    { title: '実装', completed: true }
                ]
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
