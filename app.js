var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var gulp = require('gulp'),
    requireDir = require('require-dir');
    requireDir('./gulp-tasks');
var jsonfile = require('jsonfile');
var http = require('http');
var url = require('url');
var cors = require('cors');
var Q = require('q');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

var deleteFolderRecursive = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });

    fs.rmdirSync(path);
  }
};

var download_file_httpget = function(file_url, type, data) {
var options = {
    host: url.parse(file_url).host,
    port: 80,
    path: url.parse(file_url).pathname
};

var file_name = url.parse(file_url).pathname.split('/').pop();
var file_extension = file_name.split('.').pop();
var file = fs.createWriteStream('./resources/' + type + '.' + file_extension);
var deferred = Q.defer();

http.get(options, function(res) {
    res.on('data', function(data) {
            file.write(data);
        }).on('end', function() {
            file.end();
            deferred.resolve(file_name);
        });
    });
return deferred.promise;
};
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/build',function(req,res){
  var data = prepareData(req.body);
  fs.unlink('./config.json',function () {
    fs.writeFileAsync('./config.json', JSON.stringify(data), {}).then(function() {
    var resourcesDir = './resources';
    var versionFile = './versions/' + data.appPath + ".json";
    
    if (fs.existsSync(resourcesDir)){
      deleteFolderRecursive(resourcesDir);
    }
  
    fs.mkdirSync(resourcesDir);

    
    if (!fs.existsSync(versionFile)){
        var ver = {
          version: "2.0.1"
        }
        jsonfile.writeFileSync(versionFile, ver);
    }
  
  

  //jsonfile.writeFileSync('config.json', data);

    download_file_httpget(data.icon, 'icon').then(function(){ 

      console.log('icon downloaded');  
      download_file_httpget(data.splashScreenLogo, 'splashlogo').then(function(){    
          console.log('splashlogo downloaded');  
          if(data.splashScreenBackgroundImg){
            download_file_httpget(data.splashScreenBackgroundImg, 'splashbg').then(function(){
            console.log('splashbg downloaded');  
            gulp.start('phonegap-build');
            });
          }
          else
          {
            gulp.start('phonegap-build');
          }
       });

    });
  });
  
    console.log(require('./config.json'));
  });

   res.end('yes');
});

app.post('/check', function(req, res){
  var result = require('./config.json');

  res.json(result);

});

app.listen(3000,function(){
  console.log("Started on PORT 3000");
});

function escapeHtml(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}


function prepareData(data) {
  var preparedData = {
    apiURL: data['feedsysettings[app_console][phonegap_apiUrl]'],
    appId: data['feedsysettings[app_console][phonegap_appId]'],
    token: data['feedsysettings[app_console][phonegap_token]'],
    appName: escapeHtml(data['feedsysettings[app_console][phonegap_appName]']),
    appDescription: escapeHtml(data['feedsysettings[app_console][phonegap_appDescription]']),
    appGoogleAnalytics: data['feedsysettings[app_console][phonegap_googleAnalytics]'],
    appPath: data['feedsysettings[app_console][phonegap_appPath]'],
    menuPrimaryHeading: escapeHtml(data['feedsysettings[app_console][primary_menu_heading]']),
    menuSecondaryHeading: escapeHtml(data['feedsysettings[app_console][secondary_menu_heading]']),
    appGoogleProjectId: data['feedsysettings[app_console][phonegap_gc]'],
    appPushWooshId: data['feedsysettings[app_console][phonegap_pushwoosh]'],
    headerColor: data['feedsysettings[app_console][header_bar_text_color]'],
    headerBarColor: data['feedsysettings[app_console][header_bar_color]'],
    headerBackgroundColor: data['feedsysettings[app_console][header_background_color]'],
    splashScreenBackground: data['feedsysettings[app_console][splash_screen_background_color]'],
    splashScreenTextColor: data['feedsysettings[app_console][phonegap_splashscreen_watermark_color]'],
    splashScreenLogo: data['feedsysettings[app_console][phonegap_splashscreen]'],
    splashScreenBackgroundImg: data['feedsysettings[app_console][phonegap_splashscreen_background_img]'],
    icon: data['feedsysettings[app_console][phonegap_icon]'],
    androidCertificatePassword: data['feedsysettings[app_console][phonegap_androidCertificatePassword]'],
    androidKeystorePassword: data['feedsysettings[app_console][phonegap_androidKeystorePassword]'],
    iosKeyPassword: data['feedsysettings[app_console][phonegap_iosKeyPassword]'],
    status: 'Data processing...',
    isEnd: false
  };
  
  return preparedData;
}


