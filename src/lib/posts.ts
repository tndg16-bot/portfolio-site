import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content', 'blog');

// Types
export interface PostData {
  id: string;
  date: string;
  title: string;
  description?: string;
  category?: string;
  tags?: string[];
  readingTime?: number;
}

export interface PostContent extends PostData {
  slug: string;
  contentHtml: string;
}

// Calculate reading time (Japanese: 400 chars/min, English: 200 words/min)
export function calculateReadingTime(content: string): number {
  // Count Japanese characters (Hiragana, Katakana, Kanji)
  const japaneseChars = (content.match(/[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/g) || []).length;

  // Count English words
  const englishWords = content
    .replace(/[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/g, '') // Remove Japanese
    .split(/\s+/)
    .filter(word => word.length > 0).length;

  // Calculate time: Japanese 400 chars/min, English 200 words/min
  const japaneseMinutes = japaneseChars / 400;
  const englishMinutes = englishWords / 200;

  // Return ceiling of total minutes, minimum 1 minute
  return Math.max(1, Math.ceil(japaneseMinutes + englishMinutes));
}

export function getSortedPostsData(): PostData[] {
  // Get file names under /content/blog
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    const data = matterResult.data as {
      date: string;
      title: string;
      description?: string;
      category?: string;
      tags?: string[];
      published?: boolean;
    };

    // Skip unpublished posts
    if (data.published === false) {
      return null;
    }

    // Skip future posts
    const postDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (postDate > today) {
      return null;
    }

    // Calculate reading time
    const readingTime = calculateReadingTime(matterResult.content);

    // Combine the data with the id
    return {
      id,
      readingTime,
      category: data.category,
      tags: data.tags,
      date: data.date,
      title: data.title,
      description: data.description,
    };
  });

  // Filter out null posts and sort by date
  const validPosts = allPostsData.filter((post): post is NonNullable<typeof post> => post !== null);

  return validPosts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Get all unique tags from all posts
export function getAllTags(): string[] {
  const posts = getSortedPostsData();
  const tagSet = new Set<string>();

  posts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => tagSet.add(tag));
    }
  });

  return Array.from(tagSet).sort();
}

// Get posts filtered by tag
export function getPostsByTag(tag: string): PostData[] {
  const posts = getSortedPostsData();
  return posts.filter(post =>
    post.tags && post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

// Get all unique categories
export function getAllCategories(): string[] {
  const posts = getSortedPostsData();
  const categorySet = new Set<string>();

  posts.forEach(post => {
    if (post.category) {
      categorySet.add(post.category);
    }
  });

  return Array.from(categorySet).sort();
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

// Get all tag slugs for static generation
export function getAllTagSlugs() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    params: {
      tag: tag.toLowerCase(),
    },
  }));
}

export async function getPostData(slug: string): Promise<PostContent> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Get description from metadata or generate from content
  const data = matterResult.data as {
    date: string;
    title: string;
    description?: string;
    category?: string;
    tags?: string[];
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

  // Calculate reading time
  const readingTime = calculateReadingTime(matterResult.content);

  // Combine the data with the id and contentHtml
  return {
    id: slug,
    slug,
    contentHtml,
    description,
    readingTime,
    category: data.category,
    tags: data.tags,
    date: data.date,
    title: data.title,
  };
}

// Get related posts based on tags and category
export function getRelatedPosts(currentSlug: string, limit: number = 3): PostData[] {
  const allPosts = getSortedPostsData();
  const currentPostIndex = allPosts.findIndex(p => p.id === currentSlug);

  if (currentPostIndex === -1) {
    return allPosts.slice(0, limit);
  }

  const currentPost = allPosts[currentPostIndex];
  const currentTags = currentPost.tags || [];
  const currentCategory = currentPost.category;

  // Score each post based on relevance
  const scoredPosts = allPosts
    .filter(post => post.id !== currentSlug)
    .map(post => {
      let score = 0;

      // Same category: +2 points
      if (post.category && post.category === currentCategory) {
        score += 2;
      }

      // Matching tags: +1 point each
      if (post.tags) {
        const matchingTags = post.tags.filter(tag =>
          currentTags.some(ct => ct.toLowerCase() === tag.toLowerCase())
        );
        score += matchingTags.length;
      }

      return { post, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);

  return scoredPosts;
}
