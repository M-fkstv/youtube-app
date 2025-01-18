/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '540px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },

    extend: {
      colors: {
        white: '#ffffff',
      },
      backgroundImage: {
        'custom-gradient':
          'linear-gradient(to left, #fff 20%, rgba(255, 255, 255, 0) 80%)',
      },
      boxShadow: {
        default: '0 35px 60px -15px rgb(196 46 46 / 80%)',
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.8)',
      },
    },
  },
  plugins: [],
};

