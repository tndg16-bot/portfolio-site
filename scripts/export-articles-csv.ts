/**
 * 記事データをCSV形式でエクスポートするスクリプト
 * 
 * 使用方法: npx tsx scripts/export-articles-csv.ts
 * 
 * 出力: articles.csv (Googleスプレッドシートにインポート可能)
 */

import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content', 'blog');
const outputPath = path.join(process.cwd(), 'articles.csv');

interface ArticleData {
    filename: string;
    title: string;
    description: string;
    category: string;
    tags: string;
    date: string;
    published: string;
    url: string;
}

function escapeCSV(value: string): string {
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
        return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
}

function exportArticlesToCSV(): void {
    const fileNames = fs.readdirSync(postsDirectory);
    const articles: ArticleData[] = [];

    for (const fileName of fileNames) {
        if (!fileName.endsWith('.md')) continue;

        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);
        const data = matterResult.data as {
            title?: string;
            description?: string;
            category?: string;
            tags?: string[];
            date?: string;
            published?: boolean;
            slug?: string;
        };

        const slug = fileName.replace(/\.md$/, '');
        const url = `https://takahiro-motoyama.vercel.app/blog/${slug}`;

        articles.push({
            filename: fileName,
            title: data.title || '',
            description: data.description || '',
            category: data.category || '',
            tags: (data.tags || []).join(', '),
            date: data.date || '',
            published: data.published !== false ? 'true' : 'false',
            url: url,
        });
    }

    // Sort by date
    articles.sort((a, b) => a.date.localeCompare(b.date));

    // Generate CSV
    const headers = ['ファイル名', 'タイトル', '説明', 'カテゴリ', 'タグ', '投稿日', '公開状態', 'URL'];
    const csvLines = [
        headers.map(escapeCSV).join(','),
        ...articles.map(article => [
            escapeCSV(article.filename),
            escapeCSV(article.title),
            escapeCSV(article.description),
            escapeCSV(article.category),
            escapeCSV(article.tags),
            escapeCSV(article.date),
            escapeCSV(article.published),
            escapeCSV(article.url),
        ].join(','))
    ];

    // Write CSV with UTF-8 BOM for Excel/Sheets compatibility
    const bom = '\uFEFF';
    fs.writeFileSync(outputPath, bom + csvLines.join('\n'), 'utf8');

    console.log(`✅ CSV exported successfully!`);
    console.log(`📁 Output: ${outputPath}`);
    console.log(`📊 Total articles: ${articles.length}`);
    console.log(`\n📋 Articles:`);
    articles.forEach((a, i) => {
        console.log(`  ${i + 1}. ${a.date} - ${a.title}`);
    });
}

exportArticlesToCSV();
