var gulp = require('gulp');

gulp.task("default", ['build'], function () {
  gulp.start('watch');
});
