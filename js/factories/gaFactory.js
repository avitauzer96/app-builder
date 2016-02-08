angular.module('feedsyApp.factories.gaFactory', [
  'ngCordova'
])
  .constant('APP_GOOGLE_ANALYTICS', '@@appGoogleAnalytics')
  .factory('gaFactory', function ($log, $rootScope, APP_GOOGLE_ANALYTICS) {
    $log.debug('init gaFactory');
    var ga,
      successHandler,
      errorHandler,
      init,
      debug = {};

    successHandler = function (msg) {
      $log.debug('gaFactory->successHandler');
      debug.loaded = true;
      debug.msg = msg;
    };

    errorHandler = function (msg) {
      $log.debug('gaFactory->errorHandler');
      debug.loaded = false;
      debug.msg = msg;
    };

    init = function (callback) {
      if (window.plugins) {
        ga = window.plugins.gaPlugin;
        ga.init(successHandler, errorHandler, APP_GOOGLE_ANALYTICS, 10);
        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
          ga.trackPage(angular.noop, angular.noop, toState.name);
        });
      }
      callback(debug);

    };

    return {
      init: init
    };


  });