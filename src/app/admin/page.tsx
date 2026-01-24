/**
 * Admin Dashboard Page
 *
 * Blog post management interface with authentication
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Plus, LogOut, FileText, Calendar, Tag, Folder } from 'lucide-react';
import { motion } from 'framer-motion';
import { AdminPostData } from '@/types/blog';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [posts, setPosts] = useState<AdminPostData[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
    fetchPosts();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/posts');
      if (response.ok) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        setPassword('');
        fetchPosts();
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/admin/posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Failed to fetch posts', error);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/posts/${slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPosts(posts.filter((p) => p.slug !== slug));
      } else {
        alert('Failed to delete post');
      }
    } catch (error) {
      alert('An error occurred while deleting the post');
    }
  };

  // Filter posts
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.description?.toLowerCase().includes(search.toLowerCase()) ||
      post.category?.toLowerCase().includes(search.toLowerCase())
  );

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
              Admin Login
            </h1>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Enter admin password"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-6 text-center">
              Set ADMIN_PASSWORD in .env.local to secure admin panel
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage your blog posts
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/admin/posts/new"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                <Plus size={18} />
                New Post
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>
        </div>

        {/* Posts list */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="mx-auto text-gray-400" size={48} />
            <p className="mt-4 text-gray-500 dark:text-gray-400 text-lg">
              {search ? 'No posts found' : 'No posts yet'}
            </p>
            {!search && (
              <Link
                href="/admin/posts/new"
                className="inline-flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                <Plus size={18} />
                Create your first post
              </Link>
            )}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="grid grid-cols-1 gap-1">
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="p-4 flex items-start gap-4">
                    {/* Post info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {!post.published && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                            Draft
                          </span>
                        )}
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate"
                          target="_blank"
                        >
                          {post.title}
                        </Link>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {post.date}
                        </span>
                        {post.category && (
                          <span className="flex items-center gap-1">
                            <Folder size={14} />
                            {post.category}
                          </span>
                        )}
                        {post.tags && post.tags.length > 0 && (
                          <span className="flex items-center gap-1">
                            <Tag size={14} />
                            {post.tags.join(', ')}
                          </span>
                        )}
                      </div>

                      {post.description && (
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {post.description}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/posts/${post.slug}`}
                        className="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(post.slug)}
                        className="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Posts</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {posts.length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">Published</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
              {posts.filter((p) => p.published).length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">Drafts</p>
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">
              {posts.filter((p) => !p.published).length}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
