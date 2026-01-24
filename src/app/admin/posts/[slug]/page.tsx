/**
 * Post Editor Page
 *
 * Create or edit blog posts
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye, Plus, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { AdminPostContent } from '@/types/blog';

export default function PostEditorPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const isNew = slug === 'new';

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    category: '',
    tags: '',
    published: true,
    content: '',
  });

  // Load existing post if editing
  useEffect(() => {
    if (!isNew) {
      loadPost();
    }
  }, [slug, isNew]);

  const loadPost = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/posts/${slug}`);
      if (response.ok) {
        const data = await response.json();
        const post: AdminPostContent = data.post;
        setFormData({
          slug: post.slug,
          title: post.title,
          date: post.date,
          description: post.description || '',
          category: post.category || '',
          tags: post.tags?.join(', ') || '',
          published: post.published,
          content: post.contentHtml || '', // Note: This needs conversion from HTML back to Markdown
        });
      } else {
        setError('Post not found');
      }
    } catch (error) {
      setError('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const tags = formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const payload = {
        slug: formData.slug,
        title: formData.title,
        date: formData.date,
        description: formData.description,
        category: formData.category,
        tags,
        published: formData.published,
        content: formData.content,
      };

      const url = isNew ? '/api/admin/posts' : `/api/admin/posts/${slug}`;
      const method = isNew ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push('/admin');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to save post');
      }
    } catch (error) {
      setError('An error occurred while saving');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
                Back
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  {isNew ? 'New Post' : 'Edit Post'}
                </h1>
                {formData.title && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-md">
                    {formData.title}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {formData.slug && (
                <Link
                  href={`/blog/${formData.slug}`}
                  target="_blank"
                  className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  <Eye size={18} />
                  Preview
                </Link>
              )}
              <button
                type="submit"
                form="post-form"
                disabled={saving}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                <Save size={18} />
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form id="post-form" onSubmit={handleSubmit} className="space-y-6">
          {/* Slug */}
          <div>
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Slug *
            </label>
            <input
              type="text"
              id="slug"
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="post-slug"
              required
              pattern="[a-z0-9-]+"
              title="Only lowercase letters, numbers, and hyphens"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Used in URL: /blog/{'{slug}'}
            </p>
          </div>

          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Post title"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Date *
            </label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={2}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
              placeholder="Brief description of the post"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Used for meta description and post preview
            </p>
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="e.g., Technology, Tutorial"
            />
          </div>

          {/* Tags */}
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Tags
            </label>
            <input
              type="text"
              id="tags"
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="tag1, tag2, tag3"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Comma-separated tags
            </p>
          </div>

          {/* Published */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) =>
                setFormData({ ...formData, published: e.target.checked })
              }
              className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="published"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Published
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Uncheck to save as draft
            </p>
          </div>

          {/* Content */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Content *
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              rows={20}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-y font-mono text-sm"
              placeholder="Write your post in Markdown format..."
              required
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Supports standard Markdown syntax
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}
