"use strict";
(function () {
  var gulp = require('gulp'),
    shell = require('gulp-shell'),
    //argv = require('minimist')(process.argv),
    argv = require('../config.json'),
    jsonfile = require('jsonfile'),
    watermark,
    splash_generation_script;
   
   if(argv.splashScreenTextColor == "black") {
       watermark = 'water-marks/black.png';
   } 
   else if(argv.splashScreenTextColor == "white") {
       watermark = 'water-marks/white.png';
   }
   else {
       watermark = 'water-marks/transparent.png'
   }
   if(!argv.splashScreenBackgroundImg){
       argv.status = 'Started resources generation...';
       jsonfile.writeFileSync('../config.json', argv);
       gulp.task('resources', shell.task([
            'rm -rf tmp/res/*',
            'sh phonegap-watermark-generator.sh ' + watermark,
            'sh phonegap-icon-generator.sh resources/icon.png',
            'sh phonegap-splash-generator.sh resources/splashlogo.png' + ' "' + argv.splashScreenBackground + '"'

       ]));
   }
   else {
       argv.status = 'Started resources generation...';
       jsonfile.writeFileSync('../config.json', argv);
        gulp.task('resources', shell.task([
            'rm -rf tmp/res/*',
            'sh phonegap-watermark-generator.sh ' + watermark,
            'sh phonegap-icon-generator.sh resources/icon.png',
            'sh phonegap-splash-imgbg-generator.sh resources/splashlogo.png resources/splashbg.png'

       ]));
       
   }

}());

