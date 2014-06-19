'use strict';

var gulp = require('gulp');
var refresh = require('gulp-livereload');
var hogan = require('gulp-hogan-compile');
var livereload = require('tiny-lr');
var server = livereload();

gulp.task('livereload-server', function () {
  server.listen(35729, function (err) {
    if (err) { return console.log(err); }
  });
});

gulp.task('css', function () {
  gulp.src('app/**/*.css').pipe(refresh(server));
});

gulp.task('js', function () {
  gulp.src('app/**/*.js').pipe(refresh(server));
});

gulp.task('html', function () {
  gulp.src('app/*.html').pipe(refresh(server));
});

gulp.task('hogan', function() {
  gulp.src('templates/**/*.html')
    .pipe(hogan('templates.js'))
    .pipe(gulp.dest('app/js/')).pipe(refresh(server));
});

gulp.task('default', function () {
  gulp.run('hogan');
  gulp.run('livereload-server');

  gulp.watch('app/**/*.css', function (event) {
    gulp.run('css');
  });

  gulp.watch('app/**/*.js', function (event) {
    gulp.run('js');
  });

  gulp.watch('app/*.html', function (event) {
    gulp.run('html');
  });

  gulp.watch('templates/**/*.html', function (event) {
    gulp.run('hogan');
  });
});
