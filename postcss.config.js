module.exports = {
    plugins: {
        'postcss-nested': {},
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