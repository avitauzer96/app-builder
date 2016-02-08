angular.module("feedsyApp.controllers.developmentCtrl", [
  'ionic',
  'ngCordova',
  'feedsyApp.services.pushWooshService'
])
  .controller('developmentCtrl', function ($scope, $log, APP_NAME, APP_VERSION, API_URL, APP_PATH,
                                           GOOGLE_PROJECT_ID, PUSHWOOSH_APP_ID, PushWooshService) {
    $log.debug('init developmentCtrl');

    $scope.platform = ionic.Platform.platform();
    $scope.app_name = APP_NAME;
    $scope.app_version = APP_VERSION;
    $scope.app_url = API_URL;
    $scope.app_path = APP_PATH;
    $scope.google_project_id = GOOGLE_PROJECT_ID;
    $scope.pushwoosh_app_id = PUSHWOOSH_APP_ID;
    $scope.pushwoosh_token = PushWooshService.token;
    $scope.pushwoosh_logs = PushWooshService.logs;
    $scope.getScreenSize = function () {
      return window.screen.width + 'x' + window.screen.height;
    };
    $scope.getInnerSize = function () {
      return window.innerWidth + 'x' + window.innerHeight;
    };

    if (typeof device !== "undefined") {
      $scope.device = device;
    }

  });