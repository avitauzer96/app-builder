"use strict";
(function () {
  var gulp = require('gulp'),
    bump = require('gulp-bump'),
    chmod = require('gulp-chmod'),
    argv = require('../config.json'),
    jsonfile = require('jsonfile');
  gulp.task('patch', function () {
    var filePath = './versions/'+ argv.appName + '.json';
    argv.status = 'Started bumping app version...';
    jsonfile.writeFileSync('../config.json', argv);
    return gulp.src([filePath])
      .pipe(chmod(777))
      // bump the version number in those files
      .pipe(bump({type: 'patch'}))
      // save it back to filesystem
      .pipe(gulp.dest('./versions'));

  });

}());

