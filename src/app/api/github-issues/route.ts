import { NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = 'tndg16-bot';
const REPO = 'portfolio-site';
const CACHE_DURATION = 300; // 5 minutes

interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  state: 'open' | 'closed';
  labels: Array<{
    name: string;
    color: string;
  }>;
  created_at: string;
  updated_at: string;
  html_url: string;
}

interface IssueStats {
  total: number;
  inProgress: number;
  completed: number;
  notStarted: number;
  lastUpdated: string;
  issues: Array<{
    id: number;
    number: number;
    title: string;
    state: string;
    labels: string[];
    updated_at: string;
    html_url: string;
  }>;
}

export async function GET() {
  try {
    if (!GITHUB_TOKEN) {
      return NextResponse.json(
        { error: 'GitHub token not configured' },
        { status: 500 }
      );
    }

    // Fetch all issues with labels
    const response = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/issues?state=all&per_page=100`,
      {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Cache-Control': `public, max-age=${CACHE_DURATION}`,
        },
        next: {
          revalidate: CACHE_DURATION,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const issues: GitHubIssue[] = await response.json();

    // Calculate statistics
    const total = issues.length;
    const inProgress = issues.filter(issue =>
      issue.labels.some(label => label.name === 'in-progress')
    ).length;
    const completed = issues.filter(issue => issue.state === 'closed').length;
    const notStarted = issues.filter(issue =>
      issue.state === 'open' &&
      !issue.labels.some(label => label.name === 'in-progress')
    ).length;

    // Get last updated date
    const lastUpdated = issues.length > 0
      ? issues.reduce((latest, issue) =>
          issue.updated_at > latest ? issue.updated_at : latest,
          issues[0].updated_at
        )
      : '';

    // Format issues for display
    const formattedIssues = issues.map(issue => ({
      id: issue.id,
      number: issue.number,
      title: issue.title,
      state: issue.state,
      labels: issue.labels.map(label => label.name),
      updated_at: issue.updated_at,
      html_url: issue.html_url,
    }));

    const stats: IssueStats = {
      total,
      inProgress,
      completed,
      notStarted,
      lastUpdated,
      issues: formattedIssues,
    };

    return NextResponse.json(stats, {
      headers: {
        'Cache-Control': `public, max-age=${CACHE_DURATION}, s-maxage=${CACHE_DURATION}`,
      },
    });
  } catch (error) {
    console.error('Error fetching GitHub issues:', error);
    return NextResponse.json(
      { error: 'Failed to fetch issues' },
      { status: 500 }
    );
  }
}
