import { NextResponse } from 'next/server';
import { projectsMetadata, type ProjectMetadata } from '@/data/projects-metadata';

// Environment variables for GitHub integration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'tndg16-bot';

// プロジェクトを含むリポジトリ名のリスト
const PROJECT_REPOS = [
  'nihongo-mate',
  'gamified-mandala-chart',
  'talent-diagnosis',
  'ai-diagnosis-six',
  'ai-writing-automation',
  'kindlescanpdf',
  'calendar-sync-manager',
  'termlog',
  'session-vault',
  'antigravity-vault',
  'self-analysis-notification',
];

interface GitHubRepo {
  name: string;
  full_name: string;
  description: string | null;
  homepage: string | null;
  topics: string[] | null;
  pushed_at: string;
  language: string | null;
  html_url: string;
  visibility: 'public' | 'private';
}

/**
 * GitHub APIから指定されたリポジトリを取得
 */
async function fetchProjectRepos(): Promise<GitHubRepo[]> {
  const results: GitHubRepo[] = [];

  for (const repoName of PROJECT_REPOS) {
    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${repoName}`;
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };

    if (GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
    }

    try {
      const response = await fetch(url, {
        headers,
        next: { revalidate: 3600 }, // 1時間ごとに再検証
      });

      if (response.ok) {
        const repo = await response.json();
        results.push(repo);
      } else {
        console.warn(`Failed to fetch repo ${repoName}:`, response.status);
      }
    } catch (error) {
      console.error(`Error fetching repo ${repoName}:`, error);
    }
  }

  return results;
}

/**
 * topicsからカテゴリを推測
 */
function inferCategoryFromTopics(topics: string[] | null): 'main' | 'tool' | 'experiment' {
  if (!topics || topics.length === 0) return 'tool';

  const topicStr = topics.join(' ').toLowerCase();

  // Main製品のトピック
  const mainProductTopics = ['japanese', 'learning', 'mandala', 'diagnosis', 'ai-diagnosis', 'talent'];
  for (const topic of mainProductTopics) {
    if (topicStr.includes(topic)) return 'main';
  }

  return 'tool';
}

/**
 * GitHubのstatusをProjectsSectionの形式に変換
 */
function mapGitHubStatus(githubVisibility: string): 'live' | 'development' | 'private' | 'coming-soon' {
  if (githubVisibility === 'private') return 'private';
  return 'live'; // publicリポジトリはすべてlive扱い
}

/**
 * topicsからtechStackを抽出
 */
function extractTechStack(topics: string[] | null, language: string | null): string[] {
  const stack: string[] = [];

  if (topics) {
    topics.forEach(topic => {
      // 特定のトピックをtechStackに追加
      const techTopics = ['next.js', 'react', 'typescript', 'python', 'supabase', 'firebase', 'openai', 'claude-api', 'vercel', 'stripe', 'web-speech-api', 'google-api', 'click', 'sqlite', 'indexeddb', 'pdf', 'chrome-extension', 'chart.js', 'lunar-javascript', 'ollama', 'semantic-search', 'windows-notification', 'obsidian-api'];
      if (techTopics.includes(topic.toLowerCase())) {
        stack.push(topic);
      }
    });
  }

  // languageも追加（重複回避）
  if (language && !stack.includes(language)) {
    stack.push(language);
  }

  return stack;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  emoji: string;
  category: 'main' | 'tool' | 'experiment';
  status: 'live' | 'development' | 'private' | 'coming-soon';
  url?: string;
  github?: string;
  techStack: string[];
  featured: boolean;
  iconColor: string;
  highlights?: string[];
}

export async function GET() {
  try {
    // GitHubからリポジトリ情報を取得
    const repos = await fetchProjectRepos();

    // メタデータと統合
    const projects: Project[] = repos.map((repo) => {
      const metadata = projectsMetadata[repo.name];

      if (!metadata) {
        // メタデータがない場合は基本的な情報のみ返す
        return {
          id: repo.name,
          slug: repo.name,
          title: repo.full_name,
          description: repo.description || 'No description',
          emoji: '📦',
          category: inferCategoryFromTopics(repo.topics),
          status: mapGitHubStatus(repo.visibility),
          url: repo.homepage || undefined,
          github: repo.html_url,
          techStack: extractTechStack(repo.topics, repo.language),
          featured: false,
          iconColor: 'blue',
        };
      }

      // メタデータがある場合はそれを優先
      const inferredCategory = metadata.category || inferCategoryFromTopics(repo.topics);

      return {
        id: repo.name,
        slug: metadata.slug,
        title: metadata.title,
        description: repo.description || metadata.title,
        emoji: metadata.emoji,
        category: inferredCategory,
        status: mapGitHubStatus(repo.visibility),
        url: repo.homepage || undefined,
        github: repo.html_url,
        techStack: extractTechStack(repo.topics, repo.language),
        featured: metadata.featured,
        iconColor: metadata.iconColor,
        highlights: metadata.highlights,
      };
    });

    // mainプロジェクトとtoolプロジェクトの数
    const mainProjects = projects.filter(p => p.category === 'main').length;
    const toolProjects = projects.filter(p => p.category === 'tool').length;

    return NextResponse.json({
      success: true,
      projects,
      stats: {
        total: projects.length,
        main: mainProjects,
        tool: toolProjects,
      },
      lastUpdated: new Date().toISOString(),
      source: 'github-api',
    });
  } catch (error) {
    console.error('Error fetching projects:', error);

    // エラー時はメタデータのみを返す
    const fallbackProjects: Project[] = Object.values(projectsMetadata).map((meta) => ({
      id: meta.slug,
      slug: meta.slug,
      title: meta.title,
      description: 'GitHub APIから情報を取得できませんでした',
      emoji: meta.emoji,
      category: meta.category,
      status: 'development',
      github: `https://github.com/${GITHUB_OWNER}/${meta.slug}`,
      techStack: [],
      featured: meta.featured,
      iconColor: meta.iconColor,
      highlights: meta.highlights,
    }));

    return NextResponse.json({
      success: false,
      projects: fallbackProjects,
      error: 'Failed to fetch GitHub data',
      lastUpdated: new Date().toISOString(),
      source: 'fallback',
    }, { status: 500 });
  }
}
