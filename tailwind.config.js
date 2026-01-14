
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark-primary': '#0f172a',
        'surface-dark-primary': '#1e293b',
        'surface-dark-secondary': '#334155',
        'text-light-primary': '#f8fafc',
        'text-light-secondary': '#94a3b8',
        'accent-primary': '#06b6d4',
        'accent-primary-hover': '#22d3ee',
        'border-dark-primary': '#334155',
        'border-dark-secondary': '#475569',
        'rose-bg-dark': '#4c0519',
        'rose-border-dark': '#be123c',
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.2, 0.8, 0.4, 1) 0.25s both',
        'gradient-x': 'gradient-x 3s ease infinite',
      },
      keyframes: {
        fadeUp: {
          'from': { opacity: '0', transform: 'translateY(40px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // npm install -D @tailwindcss/typography 필요 (없으면 생략 가능하나 ContentCard 스타일 위해 권장)
  ],
}
