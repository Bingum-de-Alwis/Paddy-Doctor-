/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9e8',
          100: '#d8eec8',
          200: '#b8e0a1',
          300: '#92ce75',
          400: '#75bd57',
          500: '#4CAF50', // Primary green
          600: '#3d8b40',
          700: '#2E7D32', // Darker green
          800: '#265a2c',
          900: '#1b4121',
        },
        secondary: {
          50: '#f5f0e8',
          100: '#e8d8c8',
          200: '#d9bea3',
          300: '#c6a47e',
          400: '#b68f63',
          500: '#a67c52',
          600: '#8D6E63', // Secondary brown
          700: '#795548', // Darker brown
          800: '#5d4037',
          900: '#3e2723',
        },
        accent: {
          500: '#FF9800', // Orange
        },
        success: {
          100: '#d4edda',
          500: '#28a745',
          700: '#1e7e34',
        },
        warning: {
          100: '#fff3cd',
          500: '#ffc107',
          700: '#d39e00',
        },
        error: {
          100: '#f8d7da',
          500: '#dc3545',
          700: '#bd2130',
        },
        info: {
          100: '#d1ecf1',
          500: '#17a2b8',
          700: '#117a8b',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};