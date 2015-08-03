var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var paths = require('../paths');
var del = require('del');

// clean just js - no minified js
gulp.task('clean-js', function(cb){
  del([paths.dist + '**/*.js'], cb);
});

gulp.task('build-js', ['lint', 'clean-js'], function() {

  return gulp.src(paths.vendor.concat(paths.js))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("app.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));

});


