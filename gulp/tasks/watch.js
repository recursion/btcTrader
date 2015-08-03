var paths = require('../paths');
var gulp = require('gulp');

/////////////////////////////////////////
//                  WATCH TASKS

// watch scripts, sass, and html
// and run build tasks when they change
gulp.task('watch', function() {
  gulp.watch(paths.html, ['copy-html']);
  gulp.watch(paths.js, ['build-js']);
  gulp.watch(paths.css, ['build-css']);
});
