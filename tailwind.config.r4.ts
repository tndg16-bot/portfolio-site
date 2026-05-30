import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

/**
 * r4 デザインシステム拡張 Tailwind 設定
 * Source: Obsidian Vault/4_システム/portfolio-site/DESIGN_SYSTEM_SPEC.md r4
 */
const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        wagashi: {
          // Primary palette (既存)
          indigo: '#165E83',
          gold: '#E6B422',
          vermilion: '#EB6101',
          charcoal: '#27221F',
          cream: '#F0E8D6',
          // Secondary palette (r4 新規追加)
          tanboku: '#5B5651',   // 淡墨：本文二次色・キャプション
          ginshu: '#C25A3C',    // 銀朱：文中アクセント・引用・職人色
          rikyu: '#888E7E',     // 利休鼠：装飾線・大型文字
          kinari: '#F8F3E6',    // 生成上：紙の白（カード地）
          aizumi: '#0C3A52',    // 藍墨：見出し強調・フッター背景
        },
      },
      fontFamily: {
        serif: ['var(--font-noto-serif-jp)', 'serif'],
        sans: ['var(--font-noto-sans-jp)', 'sans-serif'],
        num: ['var(--font-fraunces)', 'serif'],
        en: ['var(--font-inter-tight)', 'sans-serif'],
      },
      spacing: {
        // 雪月花スケール (8px baseline + non-fibonacci)
        'w-1': '8px',
        'w-2': '16px',
        'w-3': '24px',
        'w-4': '40px',
        'w-5': '64px',
        'w-6': '96px',
        'w-7': '144px',
        'w-8': '200px',
        'w-9': '280px',
      },
      letterSpacing: {
        heading: '0.08em',
        body: '0.04em',
      },
      lineHeight: {
        heading: '1.5',
        body: '2.0',
      },
      maxWidth: {
        'wagashi-read': '640px',
        'wagashi-card': '1120px',
        'wagashi-hero': '1280px',
      },
      transitionTimingFunction: {
        'wagashi-accordion': 'cubic-bezier(0.22, 0.6, 0.36, 1)',
      },
      transitionDuration: {
        'wagashi-hover': '180ms',
        'wagashi-accordion': '240ms',
      },
    },
  },
  plugins: [typography],
};
export default config;
