import { getAllPostIds, getPostData } from '@/lib/posts';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    slug: string;
  };
};

// Generate metadata for the page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await getPostData(params.slug);
    return {
      title: post.title,
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
  const { slug } = params;

  try {
    const post = await getPostData(slug);

    return (
      <article className="container mx-auto p-4 prose lg:prose-xl prose-invert">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <div className="text-gray-500 mb-6">{post.date}</div>
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    );
  } catch (error) {
    notFound();
  }
}
