'use strict';

var gulp = require('gulp');
var server = require('browser-sync').create();

gulp.task('refresh', function (done) {
  server.reload();
  done();
});

gulp.task('server', function () {
  server.init({
    server: '',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('*.html', gulp.series('refresh'));
  gulp.watch('js/**/*.js', gulp.series('refresh'));
});

gulp.task('start', gulp.series('server'));
