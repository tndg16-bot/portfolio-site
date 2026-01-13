import { getAllPostIds, getPostData } from '@/lib/posts';
import { SITE_URL } from '@/lib/constants';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ShareButtons from '@/components/ShareButtons';
import GiscusComments from '@/components/GiscusComments';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
import { ArrowLeft, Calendar, Tag, Folder } from 'lucide-react';

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

    const ogImageUrl = `${SITE_URL}/api/og?title=${encodeURIComponent(post.title)}`;

    return {
      title: post.title,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        url: `${SITE_URL}/blog/${slug}`,
        siteName: '本山貴大 Portfolio',
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
  const url = `${SITE_URL}/blog/${slug}`;

  try {
    const post = await getPostData(slug);
    const ogImageUrl = `${SITE_URL}/api/og?title=${encodeURIComponent(post.title)}`;

    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
        <ArticleJsonLd
          title={post.title}
          description={post.description}
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

        {/* Hero Section with Eyecatch */}
        <div className="relative w-full aspect-[21/9] max-h-[400px] overflow-hidden">
          <Image
            src={ogImageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
        </div>

        {/* Back to Blog Link */}
        <div className="container mx-auto px-4 -mt-16 relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-teal-400 transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            記事一覧に戻る
          </Link>
        </div>

        {/* Article Container */}
        <article className="container mx-auto px-4 pb-16 relative z-10">
          <div className="max-w-[65ch] mx-auto">

            {/* Article Header */}
            <header className="mb-10">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400 mb-6">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-teal-400" />
                  <time dateTime={post.date}>{post.date}</time>
                </div>

                {post.category && (
                  <div className="flex items-center gap-1.5">
                    <Folder size={14} className="text-violet-400" />
                    <span className="px-2 py-0.5 rounded bg-violet-500/20 text-violet-400">
                      {post.category}
                    </span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <Tag size={14} className="text-zinc-500" />
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs rounded bg-zinc-800 text-zinc-400 hover:bg-zinc-700 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Share Buttons */}
              <div className="mt-6 pt-6 border-t border-zinc-800">
                <ShareButtons url={url} title={post.title} />
              </div>
            </header>

            {/* Article Content */}
            <div
              className="prose prose-lg prose-invert prose-zinc max-w-none
                prose-headings:text-white prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-b prose-h2:border-zinc-800 prose-h2:pb-2
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-zinc-300 prose-p:leading-relaxed
                prose-a:text-teal-400 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white
                prose-blockquote:border-l-teal-500 prose-blockquote:bg-zinc-800/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r
                prose-code:text-teal-400 prose-code:bg-zinc-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800
                prose-li:text-zinc-300
                prose-hr:border-zinc-700"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            {/* Bottom Share Section */}
            <div className="mt-16 pt-8 border-t border-zinc-800">
              <h3 className="text-lg font-semibold mb-4 text-zinc-300">この記事をシェアする</h3>
              <ShareButtons url={url} title={post.title} />
            </div>

            {/* Back to Blog (Bottom) */}
            <div className="mt-8 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-800 text-zinc-300 hover:bg-teal-500/20 hover:text-teal-400 transition-all"
              >
                <ArrowLeft size={16} />
                記事一覧に戻る
              </Link>
            </div>

            {/* Comments Section */}
            <div className="mt-16 pt-8 border-t border-zinc-800">
              <h3 className="text-xl font-semibold mb-6 text-zinc-300">コメント</h3>
              <GiscusComments />
            </div>
          </div>
        </article>
      </div>
    );
  } catch {
    notFound();
  }
}
