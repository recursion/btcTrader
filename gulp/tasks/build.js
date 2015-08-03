var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");

var src = ['src/**/*.js'];
var vendor = ['node_modules/mithril/mithril.js'];

gulp.task('build', ['lint'], function() {

  return gulp.src(src.concat(vendor))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("app.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));

});

