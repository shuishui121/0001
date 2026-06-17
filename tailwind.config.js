/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,vue}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        'mo': {
          'brown': '#5C4033',
          'brown-dark': '#3E2A20',
          'brown-light': '#7A5A47',
          'gold': '#C4A35A',
          'gold-dark': '#A68B3D',
          'gold-light': '#DBC47D',
          'ochre': '#8B4513',
          'bronze': '#4A7C59',
          'bronze-dark': '#365A41',
          'cream': '#F5F0E8',
          'cream-dark': '#E8DFD0',
          'paper': '#F9F5ED',
          'ink': '#2D2420',
        }
      },
      fontFamily: {
        'serif': ['SimSun', 'STSong', 'serif'],
        'sans': ['Microsoft YaHei', 'PingFang SC', 'sans-serif'],
      },
      boxShadow: {
        'ancient': '0 4px 20px rgba(92, 64, 51, 0.15)',
        'ancient-lg': '0 8px 30px rgba(92, 64, 51, 0.2)',
        'ancient-inner': 'inset 0 2px 4px rgba(92, 64, 51, 0.1)',
      },
      backgroundImage: {
        'paper-texture': "linear-gradient(135deg, #F9F5ED 0%, #F0E8DA 100%)",
        'bamboo-pattern': "repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(92, 64, 51, 0.03) 30px, rgba(92, 64, 51, 0.03) 31px)",
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};
