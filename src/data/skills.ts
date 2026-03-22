import { projects } from './projects';

// ============= Types =============

export type SkillCategory = 'frontend' | 'backend' | 'ai-ml' | 'platform' | 'tool';

export interface Skill {
  id: string;
  name: string;
  nameJa?: string;
  category: SkillCategory;
  proficiency: 1 | 2 | 3 | 4 | 5; // 1=awareness, 2=basic, 3=project use, 4=confident, 5=expert
  featured: boolean;
}

export interface CareerMilestone {
  id: string;
  year: string;
  title: string;
  titleJa: string;
  domain: 'finance' | 'hr' | 'ai';
  description: string;
  skills: string[];
  highlight?: string;
}

export interface ImpactMetric {
  id: string;
  label: string;
  value: string;
  description: string;
  icon: string; // lucide icon name
}

export interface SkillCategoryMeta {
  id: SkillCategory;
  label: string;
  color: string; // tailwind color token
}

// ============= Category Metadata =============

export const skillCategories: SkillCategoryMeta[] = [
  { id: 'frontend', label: 'フロントエンド', color: 'japan-indigo' },
  { id: 'backend', label: 'バックエンド', color: 'japan-charcoal' },
  { id: 'ai-ml', label: 'AI / ML', color: 'japan-gold' },
  { id: 'platform', label: 'プラットフォーム', color: 'japan-violet' },
  { id: 'tool', label: 'ツール・インフラ', color: 'japan-moss' },
];

// ============= Skills Data =============

export const skills: Skill[] = [
  // Frontend
  { id: 'nextjs', name: 'Next.js', category: 'frontend', proficiency: 5, featured: true },
  { id: 'react', name: 'React', category: 'frontend', proficiency: 5, featured: true },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', proficiency: 5, featured: true },
  { id: 'tailwindcss', name: 'Tailwind CSS', category: 'frontend', proficiency: 5, featured: false },
  { id: 'framer-motion', name: 'Framer Motion', category: 'frontend', proficiency: 4, featured: false },

  // Backend
  { id: 'python', name: 'Python', category: 'backend', proficiency: 4, featured: true },
  { id: 'nodejs', name: 'Node.js', category: 'backend', proficiency: 4, featured: false },
  { id: 'sqlite', name: 'SQLite', category: 'backend', proficiency: 3, featured: false },
  { id: 'prisma', name: 'Prisma', category: 'backend', proficiency: 3, featured: false },

  // AI / ML
  { id: 'openai', name: 'OpenAI API', category: 'ai-ml', proficiency: 4, featured: true },
  { id: 'claude-api', name: 'Claude API', category: 'ai-ml', proficiency: 4, featured: true },
  { id: 'prompt-engineering', name: 'Prompt Engineering', nameJa: 'プロンプト設計', category: 'ai-ml', proficiency: 5, featured: true },
  { id: 'langchain', name: 'LangChain', category: 'ai-ml', proficiency: 3, featured: false },

  // Platform
  { id: 'supabase', name: 'Supabase', category: 'platform', proficiency: 4, featured: true },
  { id: 'firebase', name: 'Firebase', category: 'platform', proficiency: 3, featured: false },
  { id: 'vercel', name: 'Vercel', category: 'platform', proficiency: 5, featured: false },
  { id: 'google-apis', name: 'Google APIs', category: 'platform', proficiency: 3, featured: false },

  // Tools
  { id: 'github-actions', name: 'GitHub Actions', category: 'tool', proficiency: 4, featured: false },
  { id: 'docker', name: 'Docker', category: 'tool', proficiency: 3, featured: false },
  { id: 'chrome-extension', name: 'Chrome Extension', category: 'tool', proficiency: 3, featured: false },
];

// ============= Career Timeline =============

export const careerMilestones: CareerMilestone[] = [
  {
    id: 'finance-1',
    year: '2014–2018',
    title: 'Securities & Finance',
    titleJa: '金融（上場証券）',
    domain: 'finance',
    description: '上場証券会社にて営業・企画を担当。金融商品の提案力と規制対応の知見を獲得。',
    skills: ['営業', '企画', '金融規制'],
    highlight: '法人向け提案スキルの基盤',
  },
  {
    id: 'hr-1',
    year: '2018–2022',
    title: 'HR Tech',
    titleJa: '人材（マイナビ）',
    domain: 'hr',
    description: 'マイナビにて採用支援・HRテック領域を担当。組織の意思決定プロセスと人材課題の構造を深く理解。',
    skills: ['採用支援', 'HR Tech', '組織コンサル'],
    highlight: '意思決定ワークショップの原型を確立',
  },
  {
    id: 'ai-1',
    year: '2022–2024',
    title: 'AI Engineering',
    titleJa: 'AI（エンジニアリング）',
    domain: 'ai',
    description: 'AI活用・自動化の技術を独学で習得。Next.js / Python / OpenAI API を軸に10以上のプロダクトを開発。',
    skills: ['Next.js', 'Python', 'OpenAI API', 'Claude API'],
    highlight: '10+のAIプロダクトを自力開発',
  },
  {
    id: 'ai-2',
    year: '2024–現在',
    title: 'Independent Consultant',
    titleJa: 'AI（独立コンサル）',
    domain: 'ai',
    description: '個人・法人向けにAI導入コンサルティングと業務自動化を提供。戦略から実装までワンストップで対応。',
    skills: ['AI導入支援', '業務自動化', 'コーチング'],
    highlight: '20社+の支援実績',
  },
];

// ============= Impact Metrics =============

export const impactMetrics: ImpactMetric[] = [
  { id: 'time-reduction', label: '業務時間削減', value: '80%', description: 'AI自動化導入後の平均削減率', icon: 'Clock' },
  { id: 'decision-speed', label: '意思決定速度', value: '2倍', description: 'ワークショップ導入後の改善', icon: 'Zap' },
  { id: 'clients', label: '支援実績', value: '20社+', description: '個人・法人の累計支援数', icon: 'Users' },
  { id: 'products', label: '開発プロダクト', value: '10+', description: '自力開発したサービス・ツール', icon: 'Code' },
  { id: 'experience', label: '実務経験', value: '12年', description: '金融・HR・AI 3業界横断', icon: 'Briefcase' },
  { id: 'articles', label: '公開記事', value: '345+', description: 'ブログ・ナレッジベース', icon: 'FileText' },
];

// ============= Helper Functions =============

export function getSkillsByCategory(category: SkillCategory): Skill[] {
  return skills.filter(s => s.category === category);
}

export function getFeaturedSkills(): Skill[] {
  return skills.filter(s => s.featured);
}

export function getProjectCountByTech(): Record<string, number> {
  const counts: Record<string, number> = {};
  const activeProjects = projects.filter(p => p.category !== 'archive');
  for (const project of activeProjects) {
    for (const tech of project.techStack) {
      const key = tech.toLowerCase().replace(/\s+/g, '-');
      counts[key] = (counts[key] || 0) + 1;
    }
  }
  return counts;
}
