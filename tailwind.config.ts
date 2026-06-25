import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        espresso: {
          50: '#f7f3ee',
          100: '#ecdfd0',
          200: '#d4b890',
          300: '#a87f4d',
          400: '#7a5530',
          500: '#523620',
          600: '#3a2517',
          700: '#28190f',
          800: '#1a1009',
          900: '#0e0805'
        },
        cream: {
          50: '#fdfaf3',
          100: '#f8f1e2',
          200: '#f0e2c4',
          300: '#e6cf9a',
          400: '#d4b06a'
        },
        tomato: {
          400: '#d24a2a',
          500: '#b8381e',
          600: '#9a2b17',
          700: '#75200f'
        },
        olive: {
          400: '#7a8a3e',
          500: '#5e6c2e',
          600: '#465220'
        },
        gold: {
          300: '#e6c98a',
          400: '#d4ac5d',
          500: '#b88a3a',
          600: '#956b27'
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
        italic: ['var(--font-italic)', 'serif']
      },
      backgroundImage: {
        'paper-grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.45 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")"
      },
      animation: {
        'slow-float': 'slowFloat 8s ease-in-out infinite',
        'soft-pulse': 'softPulse 3.4s ease-in-out infinite'
      },
      keyframes: {
        slowFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        softPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' }
        }
      }
    }
  },
  plugins: []
};

export default config;
