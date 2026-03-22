'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import ThemeToggle from '@/components/ThemeToggle';

const navItems = [
  { href: '/services', label: 'サービス' },
  { href: '/case-studies', label: '導入事例' },
  { href: '/about', label: '私について' },
  { href: '/blog', label: 'ブログ' },
];

const ctaItem = { href: '/contact', label: '無料診断' };

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Hide header on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 80) {
        // Always show near top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        // Scrolling down & past threshold
        setIsVisible(false);
        setIsMenuOpen(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-header-bg backdrop-blur-xl border-b border-border-default transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-japan-gradient"
          >
            Takahiro Motoyama
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-2 text-sm font-medium transition-colors ${
                  pathname === item.href || pathname?.startsWith(item.href + '/')
                    ? 'text-text-strong'
                    : 'text-text-muted hover:text-text-strong'
                }`}
              >
                {item.label}
                {(pathname === item.href || pathname?.startsWith(item.href + '/')) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-japan-indigo to-japan-vermilion"
                  />
                )}
              </Link>
            ))}

            <ThemeToggle />

            {/* CTA Button */}
            <Link
              href={ctaItem.href}
              className="bg-japan-vermilion text-white px-6 py-2.5 rounded-full font-bold hover:bg-japan-vermilion/90 transition-colors duration-200 flex items-center gap-1.5 text-sm"
            >
              {ctaItem.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-1">
            <ThemeToggle />
          <button
            className="p-2 text-text-muted hover:text-text-strong"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
              role="navigation"
              aria-label="モバイルメニュー"
            >
              <div className="mt-3 pb-4 border-t border-border-default pt-4 flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center min-h-[48px] px-4 text-base font-medium rounded-lg transition-colors ${
                      pathname === item.href || pathname?.startsWith(item.href + '/')
                        ? 'text-text-strong bg-surface-section'
                        : 'text-text-secondary hover:text-text-strong hover:bg-surface-section'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Mobile CTA Button */}
                <div className="mt-4 px-2">
                  <Link
                    href={ctaItem.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 min-h-[48px] bg-japan-vermilion text-white rounded-full font-bold text-base hover:opacity-90 transition-all"
                  >
                    {ctaItem.label}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
