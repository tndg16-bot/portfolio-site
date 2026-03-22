import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Accessibility utilities
      srOnly: {
        '0': 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0',
      },
      colors: {
        'japan': {
          indigo: '#165E83', // Ai-iro (藍色)
          cream: '#F5F5F4',  // Light background
          vermilion: '#EB6101', // Shu-iro
          charcoal: '#27221F', // Sumi-iro
          gold: '#E6B422', // Kin-iro (金色)
          moss: '#546c59', // Matcha
          violet: '#5f4b8b', // Edo-murasaki
        }
      },
      fontFamily: {
        sans: ['var(--font-noto-jp)', 'var(--font-inter)', 'sans-serif'],
        jp: ['var(--font-noto-jp)', 'sans-serif'],
      }
    },
  },
  plugins: [typography],
};
export default config;
