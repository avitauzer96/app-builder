angular.module('feedsyApp.services.sliderService', [
  'feedsyApp.factories.apiFactory'
])
  .service('sliderService', function ($log) {
    $log.debug('init sliderService');

    var self = this;

    self.slides = [
      {
        "img": "img/xPertNews_Logo.png"
      },
      {
        "img": "img/xPertNews_Logo.png"
      },
      {
        "img": "img/xPertNews_Logo.png"
      }
    ];
    $log.debug('Self slides');
    $log.debug(self.slides);
    self.getSlides = function () {
      $log.debug('sliderService->getSlides');

      return self.slides;
    };
  });