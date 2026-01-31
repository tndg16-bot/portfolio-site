'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const searchQuery = searchParams.get('q') || '';

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }, [query, router]);

  const handleClose = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <form onSubmit={handleSearch} className="relative">
      <div className="relative">
        <motion.div
          className={`
            relative w-full md:w-64
            glass-card
            rounded-lg px-4 py-2.5
            flex items-center gap-3
            transition-all duration-300
            ${isFocused ? 'ring-2 ring-teal-500/50' : 'focus-within:ring-2 ring-teal-500/50'}
          `}
          initial={{ scale: 0.95, opacity: 0.9 }}
          animate={{ scale: 1, opacity: 1 }}
          onFocus={() => setIsFocused(true)}
          onBlur={handleClose}
        >
          <Search
            className={`w-5 h-5 text-zinc-500 transition-colors ${
              isFocused ? 'text-teal-400' : ''
            }`}
            aria-label="記事を検索"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="記事を検索..."
            className="w-full bg-transparent text-white placeholder-zinc-500 outline-none text-sm"
            aria-label="記事を検索"
          />
        </motion.div>
      </div>
    </form>
  );
}
