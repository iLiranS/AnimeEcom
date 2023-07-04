/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}'

  ],
  darkMode:'class',
  theme: {
    extend: {
      screens:{
        'xs':'320px',
        's':'400px',
      },
      colors:{
        "mainText":"#191C27",
        "mainBG":"#efefef",
        "mainTextDark":'#efefef',
        "mainBgDark":'#191C27',
      },
      keyframes: {
        enterFromRight: {
          from: { opacity: 0, transform: 'translateX(200px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        enterFromTop:{
          from:{ opacity: 0, transform: '-translateY(full)'},
          to:{opacity:1,transform:'translateY(0)'}
        },
        exitFromTop:{
          from:{ opacity: 1, transform: 'translateY(0)'},
          to:{opacity:0,transform:'-translateY(full)'}
        },
        enterFromBottom:{
          from:{transform: 'translateY(300px) translateX(-50%)'},
          to:{transform:'translateY(0) translateX(-50%)'}
        },
        enterFromLeft: {
          from: { opacity: 0, transform: 'translateX(-200px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        exitToRight: {
          from: { opacity: 1, transform: 'translateX(0)' },
          to: { opacity: 0, transform: 'translateX(200px)' },
        },
        exitToLeft: {
          from: { opacity: 1, transform: 'translateX(0)' },
          to: { opacity: 0, transform: 'translateX(-200px)' },
        },
        scaleIn: {
          from: { opacity: 0, transform: 'rotateX(-10deg) scale(0.9)' },
          to: { opacity: 1, transform: 'rotateX(0deg) scale(1)' },
        },
        scaleOut: {
          from: { opacity: 1, transform: 'rotateX(0deg) scale(1)' },
          to: { opacity: 0, transform: 'rotateX(-10deg) scale(0.95)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        fadeOut: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
      },
      animation: {
        scaleIn: 'scaleIn 200ms ease',
        scaleOut: 'scaleOut 200ms ease',
        fadeIn: 'fadeIn 200ms ease',
        fadeOut: 'fadeOut 200ms ease',
        enterFromLeft: 'enterFromLeft 250ms ease',
        enterFromRight: 'enterFromRight 250ms ease',
        exitToLeft: 'exitToLeft 250ms ease',
        exitToRight: 'exitToRight 250ms ease',
        enterFromTop: 'enterFromTop 250ms ease',
        exitFromTop: 'exitFromTop 250ms ease',
        enterFromBottom: 'enterFromBottom 300ms ease'
      },
      
    },
  },
  plugins: [
  ],
}
