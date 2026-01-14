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

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

// Extract headings from markdown content for Table of Contents
export function extractHeadings(markdown: string): TocHeading[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: TocHeading[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    // Create URL-friendly ID
    const id = text
      .toLowerCase()
      .replace(/[^\w\s\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/g, '')
      .replace(/\s+/g, '-');

    headings.push({ id, text, level });
  }

  return headings;
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

  // Extract headings for Table of Contents
  const headings = extractHeadings(matterResult.content);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  let contentHtml = processedContent.toString();

  // Add IDs to h2 and h3 elements for TOC linking
  headings.forEach(({ id, text }) => {
    // Match h2 and h3 tags containing the heading text
    const escapedText = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(<h[23])>\\s*${escapedText}\\s*</h[23]>`, 'gi');
    contentHtml = contentHtml.replace(regex, `$1 id="${id}">${text}</h2>`);
  });

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
    headings,
    description,
    title: data.title,
    date: data.date,
    category: data.category,
    tags: data.tags,
    published: data.published,
  };
}
