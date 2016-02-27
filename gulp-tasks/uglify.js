"use strict";
(function () {
  var gulp = require('gulp'),
    concat = require('gulp-concat'),
    replace = require('gulp-replace-task'),
    templateCache = require('gulp-angular-templatecache'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglifyjs'),
    clean = require('gulp-clean'),
    //argv = require('minimist')(process.argv),
    argv = require('../config.json'),
    jsonfile = require('jsonfile'),
    chmod = require('gulp-chmod');

// gulp watch --API_URL=http://mbugay.dev1.justcoded.com/xpertnews/wp-json

  gulp.task('template_js', ['clean_tmp'], function (done) {
    argv.status = 'Started templates generation...';
    jsonfile.writeFileSync('../config.json', argv);
    gulp.src('./templates/**/*.html')
       .pipe(replace({
        patterns: [
          {
            match: 'menuPrimaryHeading',
            replacement: argv.menuPrimaryHeading
          },
          {
            match: 'menuSecondaryHeading',
            replacement: argv.menuSecondaryHeading
          }
        ]
      }))
      .pipe(templateCache({standalone: true, root: 'templates/', module: 'feedsyApp.templates'}))
      .pipe(chmod(777))
      .pipe(gulp.dest('./tmp/js'))
      .on('end', done);
  });

  gulp.task('clean_js', function () {
    argv.status = 'Started js cleaning task...';
    jsonfile.writeFileSync('../config.json', argv);
    return gulp.src(['./www/js'], {read: false})
      .pipe(chmod(777))
      .pipe(clean());
  });

  gulp.task('concat_annotate_js', ['patch', 'clean_js', 'template_js'], function (done) {
    argv.status = 'Started js files concatenation...';
    jsonfile.writeFileSync('../config.json', argv);
    var appName = argv.appName.replace(/&amp;/g, '&');
    var filePath = '../versions/'+ argv.appPath + '.json';
    gulp.src([
      './js/app.js',
      './js/decorators/*.js',
      './js/factories/*.js',
      './js/factories.js',
      './js/services/*.js',
      './js/services.js',
      './js/controllers/modal/*.js',
      './js/controllers/*.js',
      './js/controllers.js',
      './js/directives/*.js',
      './js/directives.js',
      './js/filters.js'
    ])
      .pipe(concat('app.js'))
      .pipe(replace({
        patterns: [
          {
            match: 'appPath',
            replacement: argv.appPath
          },
          {
            match: 'appVersion',
            replacement: require(filePath).version
          },
          {
            match: 'apiURL',
            replacement: argv.apiURL
          },
          {
            match: 'appName',
            replacement: appName
          },
          {
            match: 'appGoogleAnalytics',
            replacement: argv.appGoogleAnalytics
          },
          {
            match: 'appGoogleProjectId',
            replacement: argv.appGoogleProjectId
          },
          {
            match: 'appPushWooshId',
            replacement: argv.appPushWooshId
          }
        ]
      }))
      .pipe(ngAnnotate({single_quotes: true}))
      .pipe(gulp.dest('./tmp/js'))
      .on('end', done);
  });


  gulp.task('uglify_js', ['concat_annotate_js'], function (done) {
    argv.status = 'Started uglify js task...';
    jsonfile.writeFileSync('../config.json', argv);
    gulp.src('./tmp/js/*.js')
      .pipe(uglify('common.min.js'))
      .pipe(gulp.dest('./www/js'))
      .on('end', done);
  });

}());

