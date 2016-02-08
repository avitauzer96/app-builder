"use strict";
(function () {
  var gulp = require('gulp'),
    clean = require('gulp-clean'),
    chmod = require('gulp-chmod'),
    argv = require('../config.json'),
    jsonfile = require('jsonfile');

  gulp.task('default', ['resources', 'config_xml', 'sass', 'uglify_js']);

  gulp.task('clean_tmp', function () {
    argv.status = 'Started cleaning tmp files...';
    jsonfile.writeFileSync('../config.json', argv);
    return gulp.src(['./tmp/css', './tmp/js'], {read: false})
      .pipe(chmod(777))
      .pipe(clean());
  });

  gulp.task('watch', function () {
    gulp.run('sass');
    gulp.run('uglify_js');
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch('./templates/**/*.html', ['uglify_js']);
    gulp.watch('./js/**/*.js', ['uglify_js']);
  });

}());

