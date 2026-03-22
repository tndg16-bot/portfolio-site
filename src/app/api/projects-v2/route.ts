import { NextResponse } from 'next/server';
import { projectsMetadata } from '@/data/projects-metadata';

// Environment variables for GitHub integration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'tndg16-bot';

// プロジェクトを含むリポジトリ名のリスト（projects-metadata.tsの全プロジェクト）
// tndg16-bot（このリポジトリ）は除外
const PROJECT_REPOS = [
  'nihongo-mate',
  'gamified-mandala-chart',
  'talent-diagnosis',
  'ai-diagnosis-six',
  'xboost',
  'emo-sns',
  'instagram-automation-platform',
  'ai-writing-automation',
  'kindlescanpdf',
  'task-manager',
  'TermLog-OpenCode',
  // 'portfolio', // 除外: このサイト自体のリポジトリ
  'TermLog',
  'SessionVault',
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
function inferCategoryFromTopics(topics: string[] | null): 'individual' | 'corporate' | 'automation' | 'archive' {
  if (!topics || topics.length === 0) return 'automation';

  const topicStr = topics.join(' ').toLowerCase();

  const individualTopics = ['diagnosis', 'ai-diagnosis', 'talent', 'kindle', 'self-analysis'];
  for (const topic of individualTopics) {
    if (topicStr.includes(topic)) return 'individual';
  }

  const corporateTopics = ['ci-cd', 'github-actions', 'enterprise'];
  for (const topic of corporateTopics) {
    if (topicStr.includes(topic)) return 'corporate';
  }

  return 'automation';
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
  category: 'individual' | 'corporate' | 'automation' | 'archive';
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

    const individualCount = projects.filter(p => p.category === 'individual').length;
    const corporateCount = projects.filter(p => p.category === 'corporate').length;
    const automationCount = projects.filter(p => p.category === 'automation').length;

    return NextResponse.json({
      success: true,
      projects: projects.filter(p => p.category !== 'archive'),
      stats: {
        total: projects.filter(p => p.category !== 'archive').length,
        individual: individualCount,
        corporate: corporateCount,
        automation: automationCount,
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
