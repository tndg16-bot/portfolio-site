import { getAllPostIds, getPostData, getRelatedPosts } from '@/lib/posts';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';
import GiscusComments from '@/components/GiscusComments';
import AuthorBio from '@/components/AuthorBio';
import NewsletterForm from '@/components/NewsletterForm';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
import { TableOfContents } from '@/components/TableOfContents';
import Script from 'next/script'; // Add Script import

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// Generate metadata for the page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await getPostData(slug);

    // Create the OGP image URL with the title query parameter
    const ogImageUrl = `https://takahiro-motoyama.vercel.app/api/og?title=${encodeURIComponent(post.title)}`;

    return {
      title: post.title,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        url: `https://takahiro-motoyama.vercel.app/blog/${slug}`,
        siteName: '本山貴裕 Portfolio',
        locale: 'ja_JP',
        type: 'article',
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.description,
        images: [ogImageUrl],
      },
    };
  } catch {
    return {
      title: 'Post not found',
    };
  }
}

// Generate static paths for all posts
export function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map(path => ({
    slug: path.params.slug
  }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const url = `https://takahiro-motoyama.vercel.app/blog/${slug}`;

  try {
    const post = await getPostData(slug);
    const ogImageUrl = `https://takahiro-motoyama.vercel.app/api/og?title=${encodeURIComponent(post.title)}`;

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
          <article className="max-w-3xl">
            <ArticleJsonLd
            title={post.title}
            description={post.description || ''}
            datePublished={post.date}
            url={url}
            image={ogImageUrl}
          />
          <BreadcrumbJsonLd
            items={[
              { name: 'Home', url: 'https://takahiro-motoyama.vercel.app' },
              { name: 'Blog', url: 'https://takahiro-motoyama.vercel.app/blog' },
              { name: post.title, url: url },
            ]}
          />

          {/* Back link */}
          <Link
            href="/blog"
            className="text-teal-400 hover:text-teal-300 transition-colors mb-6 inline-block"
          >
            ← ブログ一覧に戻る
          </Link>

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              {post.title}
            </h1>

            {/* Meta information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
              <time dateTime={post.date}>{post.date}</time>

              {post.readingTime && (
                <span className="reading-time-badge">
                  📖 {post.readingTime}分で読める
                </span>
              )}

              {post.category && (
                <span className="px-3 py-1 bg-teal-500/10 text-teal-400 rounded-full text-xs">
                  {post.category}
                </span>
              )}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${encodeURIComponent(tag.toLowerCase())}`}
                    className="blog-tag"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
          </header>

          {/* Share buttons */}
          <div className="mb-8">
            <ShareButtons url={url} title={post.title} />
          </div>

          {/* Article Content */}
          <div
            className="prose-blog"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {/* Author Bio */}
          <AuthorBio className="mt-12" />

          {/* Related Posts */}
          {(() => {
            const relatedPosts = getRelatedPosts(slug, 3);
            if (relatedPosts.length === 0) return null;
            return (
              <div className="mt-12 border-t border-zinc-800 pt-8">
                <h3 className="text-xl font-semibold mb-6 text-zinc-300">関連記事</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.id}`}
                      className="glass-card p-4 rounded-xl hover:border-teal-500/30 transition-all group block"
                    >
                      <h4 className="text-sm font-semibold text-white group-hover:text-teal-400 transition-colors line-clamp-2 mb-2">
                        {relatedPost.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        {relatedPost.category && (
                          <span className="px-2 py-0.5 bg-teal-500/10 text-teal-400 rounded">
                            {relatedPost.category}
                          </span>
                        )}
                        {relatedPost.readingTime && (
                          <span>📖 {relatedPost.readingTime}分</span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Share section */}
          <div className="mt-12 border-t border-zinc-800 pt-8">
            <h3 className="text-xl font-semibold mb-4 text-zinc-300">この記事をシェア</h3>
            <ShareButtons url={url} title={post.title} />
          </div>

          {/* Newsletter */}
          <div className="mt-16 mb-8">
            <NewsletterForm />
          </div>

          {/* Comments */}
          <div className="mt-12 border-t border-zinc-800 pt-8">
            <h3 className="text-xl font-semibold mb-4 text-zinc-300">コメント</h3>
            <GiscusComments />
          </div>
          </article>

          {/* Table of Contents - Desktop Sidebar */}
          <aside className="hidden lg:block">
            <TableOfContents content={post.contentHtml} />
          </aside>
        </div>

        {/* Table of Contents - Mobile */}
        <div className="lg:hidden mt-8 mb-4">
          <TableOfContents content={post.contentHtml} />
        </div>

        <Script id="mermaid-init" strategy="afterInteractive">
          {`
            import('https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs').then((mermaid) => {
              mermaid.default.initialize({
                startOnLoad: false,
                theme: 'base',
                themeVariables: {
                  fontFamily: 'inherit',
                  darkMode: true,
                  background: 'transparent',
                  
                  /* Nodes: Deep Slate with Bright Sky Border */
                  mainBkg: '#0f172a',              /* Slate 900 (Darker) */
                  nodeBorder: '#38bdf8',           /* Sky 400 (Vibrant Blue) */
                  textColor: '#f0f9ff',            /* Sky 50 (Bright White-Blue) */
                  
                  /* Lines: Clearly visible but not distracting */
                  lineColor: '#cbd5e1',            /* Slate 300 */
                  arrowheadColor: '#38bdf8',       /* Match Border */
                  
                  /* Clusters */
                  clusterBkg: 'rgba(255, 255, 255, 0.03)',
                  clusterBorder: '#38bdf8',
                  titleColor: '#f0f9ff',
                  edgeLabelBackground: '#1e293b',  /* Slate 800 */
                  
                  /* Flowchart Specifics */
                  primaryColor: '#0f172a',
                  primaryTextColor: '#f0f9ff',
                  primaryBorderColor: '#38bdf8',
                  tertiaryColor: '#fff'
                }
              });

              const renderMermaid = async () => {
                const mermaidBlocks = document.querySelectorAll('code.language-mermaid');
                
                for (const block of mermaidBlocks) {
                  const pre = block.parentElement;
                  if (pre && pre.tagName === 'PRE') {
                    const container = document.createElement('div');
                    container.className = 'mermaid-container';
                    
                    const div = document.createElement('div');
                    div.className = 'mermaid';
                    div.textContent = block.textContent;
                    
                    container.appendChild(div);
                    pre.replaceWith(container);
                  }
                }
                
                await mermaid.default.run();
              };

              if (document.readyState === 'complete') {
                renderMermaid();
              } else {
                window.addEventListener('load', renderMermaid);
              }
            });
          `}
        </Script>
      </div>
    );
  } catch {
    notFound();
  }
}
