/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        'float': 'float 4s ease-in-out infinite',
        'cinematic-reveal': 'cinematicReveal 2s cubic-bezier(0.25, 0.1, 0.25, 1)',
        'light-sweep': 'lightSweep 2s cubic-bezier(0.4, 0, 0.2, 1)',
        'film-grain': 'filmGrain 0.5s steps(1) infinite',
        'cinematic-spin': 'cinematicSpin 2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-15px) scale(1.02)' },
        },
        cinematicReveal: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(100px) scale(0.9)',
            filter: 'blur(10px)'
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0) scale(1)',
            filter: 'blur(0px)'
          },
        },
        lightSweep: {
          '0%': { 
            transform: 'translateX(-100%) skewX(-15deg)',
            opacity: '0'
          },
          '50%': { opacity: '1' },
          '100%': { 
            transform: 'translateX(200%) skewX(-15deg)',
            opacity: '0'
          },
        },
        filmGrain: {
          '0%': { backgroundPosition: '0 0' },
          '10%': { backgroundPosition: '-1px -1px' },
          '20%': { backgroundPosition: '1px -1px' },
          '30%': { backgroundPosition: '-1px 1px' },
          '40%': { backgroundPosition: '1px 1px' },
          '50%': { backgroundPosition: '0 -1px' },
          '60%': { backgroundPosition: '-1px 0' },
          '70%': { backgroundPosition: '1px 0' },
          '80%': { backgroundPosition: '0 1px' },
          '90%': { backgroundPosition: '-1px -1px' },
          '100%': { backgroundPosition: '0 0' },
        },
        cinematicSpin: {
          '0%': { 
            transform: 'rotate(0deg) scale(1)',
            filter: 'brightness(1)'
          },
          '50%': { 
            transform: 'rotate(180deg) scale(1.1)',
            filter: 'brightness(1.2)'
          },
          '100%': { 
            transform: 'rotate(360deg) scale(1)',
            filter: 'brightness(1)'
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      colors: {
        'cinematic-gold': '#FFD700',
        'cinematic-blue': '#0064C8',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'gradient-cinematic': 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(20,20,30,0.8) 50%, rgba(0,0,0,0.95) 100%)',
        'film-grain': 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
      },
      aspectRatio: {
        'imax': '1.43',
        'cinematic': '2.35',
      },
      letterSpacing: {
        'widest': '0.3em',
      },
      textShadow: {
        'cinematic': '0 2px 4px rgba(0,0,0,0.5), 0 4px 8px rgba(0,0,0,0.3), 0 8px 16px rgba(0,0,0,0.2)',
        'glow': '0 0 10px rgba(255,255,255,0.3), 0 0 20px rgba(255,255,255,0.2), 0 0 30px rgba(255,255,255,0.1)',
      },
      transitionTimingFunction: {
        'cinematic': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      scale: {
        '102': '1.02',
      },
    },
  },
  plugins: [],
}