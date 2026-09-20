/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        substrate: '#0D0F14',
        surface: {
          DEFAULT: 'rgba(22, 25, 33, 0.78)',
          border: 'rgba(255, 255, 255, 0.08)',
          hover: 'rgba(255, 255, 255, 0.14)',
        },
        primary: {
          DEFAULT: '#F1F5F9',
          muted: '#94A3B8',
          subtle: '#64748B',
        },
        accent: {
          normal: '#2E9E6B',
          warn: '#D99A2B',
          crit: '#D4553F',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        panel: '20px',
      }
    },
  },
  plugins: [],
};
