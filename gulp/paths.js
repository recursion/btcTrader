module.exports = {
  dist: 'dist/',
  // ensure app.js is loaded last
  js: ['src/components/**/*.js', 'src/app.js'],
  html: ['src/index.html'],
  css: ['src/**/*.scss'],
  vendor: ['node_modules/mithril/mithril.js']
};
