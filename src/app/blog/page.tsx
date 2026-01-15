import Link from 'next/link';
import { getSortedPostsData, getAllTags, getAllCategories } from '@/lib/posts';
import { Metadata } from 'next';
import NewsletterForm from '@/components/NewsletterForm';

export const metadata: Metadata = {
  title: 'Blog | 本山貴大',
  description: 'コーチング、AI活用、思考法、キャリア、生産性に関するブログ記事一覧',
};

export default function BlogPage() {
  const allPostsData = getSortedPostsData();
  const allTags = getAllTags();
  const allCategories = getAllCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Blog</h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            コーチング、AI活用、思考法、キャリア、生産性など、人生をより豊かにするヒントをお届けします。
          </p>
        </header>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Categories */}
            <div className="glass-card rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">カテゴリ</h3>
              <div className="flex flex-wrap gap-2">
                {allCategories.map((category) => (
                  <span
                    key={category}
                    className="px-3 py-1 bg-teal-500/10 text-teal-400 rounded-full text-sm"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">タグ</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.slice(0, 15).map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${encodeURIComponent(tag.toLowerCase())}`}
                    className="blog-tag"
                  >
                    #{tag}
                  </Link>
                ))}
                {allTags.length > 15 && (
                  <span className="text-zinc-500 text-sm">
                    +{allTags.length - 15} more
                  </span>
                )}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="grid gap-6">
              {allPostsData.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="glass-card p-6 rounded-xl hover:border-teal-500/30 transition-all group block"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-white group-hover:text-teal-400 transition-colors mb-2">
                        {post.title}
                      </h2>
                      {post.description && (
                        <p className="text-zinc-400 text-sm line-clamp-2 mb-3">
                          {post.description}
                        </p>
                      )}
                      <div className="flex flex-wrap items-center gap-3">
                        {post.category && (
                          <span className="text-xs px-2 py-1 bg-teal-500/10 text-teal-400 rounded">
                            {post.category}
                          </span>
                        )}
                        {post.readingTime && (
                          <span className="text-xs text-zinc-500">
                            📖 {post.readingTime}分
                          </span>
                        )}
                        {post.tags && post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs text-zinc-500">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <time
                      dateTime={post.date}
                      className="text-sm text-zinc-500 whitespace-nowrap"
                    >
                      {post.date}
                    </time>
                  </div>
                </Link>
              ))}
            </div>

            {/* Article Count */}
            <div className="text-center mt-8 text-zinc-500">
              全{allPostsData.length}件の記事
            </div>
          </main>
        </div>

        {/* Newsletter */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <NewsletterForm />
        </div>
      </div>
    </div>
  );
}

