import { getAllPostIds, getPostData } from '@/lib/posts';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ShareButtons from '@/components/ShareButtons';
import GiscusComments from '@/components/GiscusComments';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';

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
  } catch (error) {
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
      <article className="container mx-auto p-4 prose lg:prose-xl prose-invert">
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
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <div className="text-gray-500 mb-2">{post.date}</div>
        
        <div className="mb-8">
          <ShareButtons url={url} title={post.title} />
        </div>

        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

        <div className="mt-12 border-t border-gray-800 pt-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-300">Share this post</h3>
          <ShareButtons url={url} title={post.title} />
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-300">Comments</h3>
          <GiscusComments />
        </div>
      </article>
    );
  } catch (error) {
    notFound();
  }
}
