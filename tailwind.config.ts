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
        background: '#FFFFFF',
        surface: '#FAFAFA',
        border: '#E5E5E5',
        text: {
          primary: '#171717',
          secondary: '#737373',
          muted: '#A3A3A3',
        },
        accent: '#404040',
        cta: {
          DEFAULT: '#262626',
          hover: '#171717',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '8px',
        lg: '12px',
      },
      spacing: {
        section: '128px',
        'section-mobile': '64px',
      },
    },
  },
  plugins: [],
};

export default config;
