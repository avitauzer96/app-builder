angular.module('feedsyApp.factories.loadingFactory', [])
  .factory('loadingFactory', function ($log, $rootScope, $ionicLoading) {
    $log.debug('init loadingFactory');
    var visible = true;
    return {
      show: function () {

        if (visible) {
          $rootScope.loading = $ionicLoading.show({
            template: '<ion-spinner></ion-spinner>',
            delay: 50,
            duration: 2000
          });
        }
      },

      hide: function () {
        if (visible) {
          $ionicLoading.hide();
        }
      },
      disable: function(){
        visible = false;
      },
      enable: function(){
        visible = true;
      }
    };

  });