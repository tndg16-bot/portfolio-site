import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content', 'blog');

export interface PostData {
  id: string;
  date: string;
  title: string;
  description?: string;
  category?: string;
  tags?: string[];
  published?: boolean;
}

export interface ContentStatus {
  totalPosts: number;
  publishedPosts: number;
  scheduledPosts: number;
  remainingScheduled: number;
  needsMoreContent: boolean;
  alertMessage?: string;
}

// Get today's date in YYYY-MM-DD format
function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

// Get all posts including scheduled ones (for admin/management)
export function getAllPostsData(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        id,
        ...(matterResult.data as Omit<PostData, 'id'>),
      };
    });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) return 1;
    return -1;
  });
}

// Get only published posts (date <= today)
export function getSortedPostsData(): PostData[] {
  const today = getToday();
  const allPosts = getAllPostsData();

  // Filter: published !== false AND date <= today
  return allPosts.filter(post =>
    post.published !== false && post.date <= today
  );
}

// Get scheduled posts (date > today)
export function getScheduledPosts(): PostData[] {
  const today = getToday();
  const allPosts = getAllPostsData();

  return allPosts.filter(post =>
    post.published !== false && post.date > today
  );
}

// Get content status for alerts
export function getContentStatus(): ContentStatus {
  const allPosts = getAllPostsData();
  const today = getToday();

  const publishedPosts = allPosts.filter(p => p.published !== false && p.date <= today);
  const scheduledPosts = allPosts.filter(p => p.published !== false && p.date > today);

  const remainingScheduled = scheduledPosts.length;
  const needsMoreContent = remainingScheduled <= 5;

  let alertMessage: string | undefined;
  if (remainingScheduled === 0) {
    alertMessage = '⚠️ 予約記事がありません！新しい記事を作成してください。';
  } else if (remainingScheduled <= 5) {
    alertMessage = `📝 予約記事が残り${remainingScheduled}件です。新しい記事の準備を始めましょう。`;
  }

  return {
    totalPosts: allPosts.length,
    publishedPosts: publishedPosts.length,
    scheduledPosts: scheduledPosts.length,
    remainingScheduled,
    needsMoreContent,
    alertMessage,
  };
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Get all metadata from frontmatter
  const data = matterResult.data as {
    date: string;
    title: string;
    description?: string;
    category?: string;
    tags?: string[];
    published?: boolean;
  };
  let description = data.description;

  if (!description) {
    // Strip markdown and newlines to get plain text
    const plainText = matterResult.content
      .replace(/#+\s/g, '') // Remove headers
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links
      .replace(/(\r\n|\n|\r)/gm, ' ') // Replace newlines with spaces
      .replace(/\s+/g, ' ') // Collapse multiple spaces
      .trim();

    description = plainText.length > 100
      ? plainText.slice(0, 100) + '...'
      : plainText;
  }

  // Combine the data with the id and contentHtml
  return {
    slug,
    contentHtml,
    description,
    title: data.title,
    date: data.date,
    category: data.category,
    tags: data.tags,
    published: data.published,
  };
}
