import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts'; // @/lib/posts は、tsconfig.jsonのpaths設定により有効
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: '記事一覧',
};

export default function BlogPage() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">記事一覧</h1>
      <ul className="space-y-4">
        {allPostsData.map(({ id, date, title }) => (
          <li key={id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <Link href={`/blog/${id}`} className="block">
              <h2 className="text-xl font-semibold text-blue-600 hover:underline">{title}</h2>
              <small className="text-gray-500">{date}</small>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
