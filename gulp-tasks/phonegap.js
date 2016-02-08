"use strict";
(function () {
  var gulp = require('gulp'),
    phonegapBuild = require('gulp-phonegap-build'),
    //argv = require('minimist')(process.argv),
    argv = require('../config.json'),
    jsonfile = require('jsonfile'),
    settings = {
      appId: argv.appId,
      user: {
        token: argv.token
      },
      keys: {},
      download: {},
      platforms: []
    };


  gulp.task('phonegap-build', [ 'resources', 'config_xml', 'sass', 'uglify_js'], function () {
    argv.status = 'Started phonegap build...';
    jsonfile.writeFileSync('../config.json', argv);
    if (argv.androidCertificatePassword && argv.androidKeystorePassword) {
      settings.keys.android     =  { key_pw: argv.androidCertificatePassword,      keystore_pw: argv.androidKeystorePassword };
      settings.download.android =  'tmp/android.apk';
      settings.platforms.push('android');
    }

    if (argv.iosKeyPassword) {
      settings.keys.ios     = { password: argv.iosKeyPassword };
      settings.download.ios =  'tmp/ios.ipa';
      settings.platforms.push('ios');
    }

    if (!settings.keys.android && !settings.keys.ios) {
      console.log('Build fail - undefined build settings');
      process.exit(1);
    }
    return gulp.src('www/**/*')
        .pipe(phonegapBuild(settings));
  });

  gulp.task('phonegap-debug', [], function () {

    if (argv.androidCertificatePassword && argv.androidKeystorePassword) {
      settings.keys.android     =  { key_pw: argv.androidCertificatePassword,      keystore_pw: argv.androidKeystorePassword };
      settings.download.android =  'tmp/android.apk';
      settings.platforms.push('android');
    }

    if (argv.iosKeyPassword) {
      settings.keys.ios     = { password: argv.iosKeyPassword };
      settings.download.ios =  'tmp/ios.ipa';
      settings.platforms.push('ios');
    }

    if (!settings.keys.android && !settings.keys.ios) {
      console.log('Build fail - undefined build settings');
      process.exit(1);
    }
    return gulp.src('www/**/*')
      .pipe(phonegapBuild(settings));
  });
}());