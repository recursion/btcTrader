var gulp = require('gulp');
var del = require('del');

// clean html
gulp.task('clean-html', function(cb){
  del(['dist/index.html'], cb);
});

// this copies html from our app components
// into the dist dir.
gulp.task('copy-html', ['clean-html'], function() {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
});
