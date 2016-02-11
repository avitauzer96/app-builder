"use strict";
(function () {
  var gulp = require('gulp'),
    replace = require('gulp-replace-task'),
    clean = require('gulp-clean'),
    chmod = require('gulp-chmod'),
    //argv = require('minimist')(process.argv);
    argv = require('../config.json'),
    jsonfile = require('jsonfile');
  gulp.task('clean_config_xml', function () {
    argv.status = 'Started cleaning config_xml...';
    jsonfile.writeFileSync('../config.json', argv);
    return gulp.src(['./www/config.xml'], {read: false})
      .pipe(chmod(777))
      .pipe(clean());
  });

  gulp.task('config_xml', ['clean_config_xml', 'patch'], function () {
    argv.status = 'Started congiguring configuration xml...';
    jsonfile.writeFileSync('../config.json', argv);
    var filePath = '../versions/'+ argv.appPath + '.json';
    var version =  require(filePath).version;
    var versionCode = version.split('.');
    return gulp.src(['./config.xml'])
      .pipe(replace({
        patterns: [
          {
            match: 'appName',
            replacement: argv.appName
          },
          {
            match: 'appPath',
            replacement: argv.appPath
          },
          {
            match: 'appVersion',
            replacement: version
          },
          {
            match: 'appVersionCode',
            replacement: versionCode[2]
          },
          {
            match: 'appDescription',
            replacement: argv.appDescription
          }
        ]
      }))
      .pipe(gulp.dest('./www'));
  });

}());

