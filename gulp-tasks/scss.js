"use strict";
(function () {
  var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace-task'),
    clean = require('gulp-clean'),
    //argv = require('minimist')(process.argv),
    argv = require('../config.json'),
    jsonfile = require('jsonfile'),
    chmod = require('gulp-chmod');

  gulp.task('clean_css', function () {
    return gulp.src(['./www/css'], {read: false})
      .pipe(chmod(777))
      .pipe(clean());
  });

  gulp.task('sass', ['clean_css'], function (done) {
    argv.status = 'Started compiling sass...';
    jsonfile.writeFileSync('../config.json', argv);
    gulp.src('./scss/ionic.scss')
      .pipe(replace({
        patterns: [
          {
            match: 'headerBackgroundColor',
            replacement: argv.headerBackgroundColor
          },
          {
            match: 'headerBarColor',
            replacement: argv.headerBarColor
          },
          {
            match: 'headerBarTextColor',
            replacement: argv.headerColor
          }
        ]
      }))
      .pipe(sass({
        errLogToConsole: true
      }))
      .pipe(gulp.dest('./tmp/css/'))
      .pipe(minifyCss({
        keepSpecialComments: 0
      }))
      .pipe(rename({extname: '.min.css'}))
      .pipe(gulp.dest('./www/css/'))
      .on('end', done);
  });


}());

