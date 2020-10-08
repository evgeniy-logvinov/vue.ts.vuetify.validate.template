module.exports = {
  plugins: {
    'postcss-nested': {},
    autoprefixer: {},
    'postcss-responsive-type': {},
    'postcss-hexrgba': {},
    'postcss-preset-env': {},
  },
  preset: {
    stage: 0,
    autoprefixer: {},
    importFrom: './static/styles/variables.css',
    preserve: false,
  },
};
