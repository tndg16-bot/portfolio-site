'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X, Search } from 'lucide-react';
import { useState } from 'react';
import { LanguageSwitcher } from './LanguageSwitcher';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/philosophy', label: 'Philosophy' },
  { href: '/sessions', label: 'Sessions' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const externalLinks = [
  { href: 'https://ai-diagnosis-six.vercel.app', label: '🤖 診断' },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-japan-indigo/10">
      <nav className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-japan-indigo to-japan-vermilion bg-clip-text text-transparent">
            Takahiro Motoyama
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Switcher - Temporarily disabled until [locale] routing migration */}
            {/* <LanguageSwitcher /> */}

            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="relative p-2 text-zinc-500 hover:text-japan-indigo transition-colors"
              aria-label="検索"
            >
              <Search className="w-5 h-5" />
            </button>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-2 text-sm font-medium transition-colors ${pathname === item.href
                  ? 'text-japan-indigo'
                  : 'text-zinc-500 hover:text-japan-indigo'
                  }`}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-japan-indigo to-japan-vermilion"
                  />
                )}
              </Link>
            ))}
            {externalLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 text-sm font-medium bg-gradient-to-r from-japan-indigo to-japan-vermilion text-white rounded-full hover:brightness-110 transition-all"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-zinc-500 hover:text-japan-indigo"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-4 pb-4 border-t border-japan-indigo/10 pt-4"
            role="navigation"
            aria-label="モバイルメニュー"
            >
            <LanguageSwitcher />
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block py-3 px-4 text-sm font-medium transition-colors ${pathname === item.href
                  ? 'text-japan-indigo bg-japan-indigo/5'
                  : 'text-zinc-500 hover:text-japan-indigo'
                  }`}
              >
                {item.label}
              </Link>
            ))}

            {externalLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-3 px-4 text-sm font-medium bg-gradient-to-r from-japan-indigo to-japan-vermilion text-white rounded-lg mx-2 text-center"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </nav>
    </header>
  );
}
