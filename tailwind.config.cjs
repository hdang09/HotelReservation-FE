module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        modal: '#0a0409',
        box: '#EFEEF1',
        primary: 'var(--primary-color)',
        fade: 'var(--fade-primary-color)',
        current: 'currentColor',
      },
      // backgroundImage: {
      //   home: 'url("./assets/img/bg.png")',
      // },
    },
  },
  plugins: [],
};
