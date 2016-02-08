angular.module('feedsyApp.services.companyService', [
  'feedsyApp.factories.apiFactory'
])
  .service('companyService', function ($log, $window, $sce, $ionicSlideBoxDelegate, apiFactory) {
    $log.debug('init companyService');

    var self = this;

    self.info = null;

    self.init = function (callback) {
      self.getInfo(callback);
    };

    self.getInfo = function (callback) {
      $log.debug('companyService->getInfo');

      if (!self.info) {
        self.downloadContent(callback);
      } else {
        callback(self.info);
      }
    };

    self.downloadContent = function (callback) {
      $log.debug('companyService->downloadContent');
      apiFactory.get("info").then(function (response) {
        self.info = response;
        var adress, i;
        for (i in self.info.details) {
          if (self.info.details.hasOwnProperty(i)) {

            adress = String(self.info.details[i].company_address).replace(/<[^>]+>/gm, '');

            self.info.details[i].google_map_img = 'http://maps.googleapis.com/maps/api/staticmap?center=' +
              adress + '&zoom=19&size=640x500&markers=blue%7Clabel:S%7C' + adress;

            self.info.details[i].google_map_link = 'http://maps.google.com/maps?q=' +
              String(self.info.details[i].company_address).replace(/<[^>]+>/gm);
          }
        }


        $ionicSlideBoxDelegate.update();
        callback(response);
      });
    };

  });