import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'japan': {
          indigo: '#1B365D', // Kachi-iro
          cream: '#F5F1E8',  // Ecru/Washi
          vermilion: '#D9381E', // Shu-iro
          charcoal: '#2D2D2D', // Sumi-iro
          gold: '#C5A059', // Kin-iro
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
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
