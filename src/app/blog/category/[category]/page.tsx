import { getPostsByCategory, getAllCategorySlugs } from '@/lib/posts';
import { Metadata } from 'next';
import Link from 'next/link';

type Props = {
    params: Promise<{
        category: string;
    }>;
};

// Generate metadata for page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category } = await params;
    const decodedCategory = decodeURIComponent(category);

    return {
        title: `「${decodedCategory}」の記事一覧 | 本山貴裕 Blog`,
        description: `「${decodedCategory}」カテゴリのブログ記事一覧です。`,
    };
}

// Generate static paths for all categories
export function generateStaticParams() {
    const categorySlugs = getAllCategorySlugs();
    return categorySlugs.map(categorySlug => ({
        category: categorySlug.params.category
    }));
}

export default async function CategoryPage({ params }: Props) {
    const { category } = await params;
    const decodedCategory = decodeURIComponent(category);
    const posts = getPostsByCategory(decodedCategory);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/blog"
                        className="text-teal-400 hover:text-teal-300 transition-colors mb-4 inline-block"
                    >
                        ← ブログ一覧に戻る
                    </Link>
                    <h1 className="text-3xl font-bold bg-japan-indigo text-white mt-4">
                        {decodedCategory}
                    </h1>
                    <p className="text-text-secondary mt-2">
                        {posts.length}件の記事が見つかりました
                    </p>
                </div>

                {/* Posts Grid */}
                {posts.length > 0 ? (
                    <div className="grid gap-6">
                        {posts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.id}`}
                                className="glass-card p-6 rounded-xl hover:border-teal-500/30 transition-all group"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div className="flex-1">
                                        <h2 className="text-xl font-semibold bg-japan-indigo text-white group-hover:text-teal-400 transition-colors">
                                            {post.title}
                                        </h2>
                                        {post.description && (
                                            <p className="text-text-secondary mt-2 line-clamp-2">
                                                {post.description}
                                            </p>
                                        )}
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {post.category && (
                                                <span className="text-xs px-2 py-1 bg-teal-500/10 text-teal-400 rounded">
                                                    {post.category}
                                                </span>
                                            )}
                                            {post.readingTime && (
                                                <span className="text-xs text-text-secondary">
                                                    📖 {post.readingTime}分で読める
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-sm text-text-secondary whitespace-nowrap">
                                        {post.date}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-text-secondary">
                            このカテゴリの記事はまだありません。
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
