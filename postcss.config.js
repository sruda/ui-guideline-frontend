const purgecss = [
  "@fullhuman/postcss-purgecss",
  {
    content: ['./**/*.html', './**/*.tsx', './/**/*.js', './**/*.scss'],
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
  }
];

module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    'autoprefixer': {},
    ...(process.env.NODE_ENV === "production" ? [purgecss] : [])
  }
};