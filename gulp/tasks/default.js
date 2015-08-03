var gulp = require('gulp');

gulp.task("default", ['build', 'copy-html'], function () {
  console.log('completed default build');
  console.log('starting watch');
});
