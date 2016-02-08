angular.module('feedsyApp.services.pushWooshService', [
  'ionic'
])
  .constant('GOOGLE_PROJECT_ID', '@@appGoogleProjectId')
  .constant('PUSHWOOSH_APP_ID', '@@appPushWooshId')
  .service('PushWooshService', function ($ionicPopup, PUSHWOOSH_APP_ID, GOOGLE_PROJECT_ID) {
    var self = this;
    self.onPushNotification = null;
    self.token = null;
    self.logs = [];
    self.logs.push('PushWooshService init');

    function initPushwoosh() {
      var pushNotification = cordova.require("com.pushwoosh.plugins.pushwoosh.PushNotification");
      self.logs.push('deviceready');

      document.addEventListener('push-notification', function (event) {
        self.logs.push('Notification:' +
          'title: ' + event.notification.title +
          'template: ' + event.notification.text +
          'userdata: ' + JSON.stringify(event.notification.userdata) +
          'source:' + JSON.stringify(event.notification)
        );


        if (self.onPushNotification) {
          self.onPushNotification(event.notification);
        }
      });

      pushNotification.onDeviceReady({projectid: GOOGLE_PROJECT_ID, pw_appid: PUSHWOOSH_APP_ID});

      //register for pushes
      pushNotification.registerDevice(
        function (token) {
          self.token = token;
          self.logs.push('success registerDevice push token: ' + JSON.stringify(token));
        },
        function (status) {
          self.logs.push('fail registerDevice' + JSON.stringify([status]));
        }
      );
      pushNotification.setApplicationIconBadgeNumber(0);
    }


    document.addEventListener("deviceready", function () {
      initPushwoosh();
    }, true);

    return self;
  });