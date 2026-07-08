/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2d5a3f', // Verde Escuro
          light: '#427a58',
          dark: '#1e3d2a',
        },
        secondary: {
          DEFAULT: '#c58925', // Dourado Ouro
          light: '#e09f3e',
        },
        creme: {
          DEFAULT: '#fcfaf4', // Cor de Fundo Geral
          card: '#f2ede0',    /* Tons folha seca do mockup */
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      boxShadow: {
        'soft': '0 2px 12px rgba(45, 90, 63, 0.04)',
        'medium': '0 4px 20px rgba(45, 90, 63, 0.08)',
      },
    },
  },
  plugins: [],
}