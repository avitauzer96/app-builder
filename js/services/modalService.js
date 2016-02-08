angular.module('feedsyApp.services.modalService', [
  'feedsyApp.factories.apiFactory'
])
  .service('modalService', function ($log, $ionicModal) {
    $log.debug('init modalService');

    var self = this;
    self.pages = {};

    self.init = function (scope) {
      self.load('search', scope, {focusFirstInput: true});
    };

    self.load = function (name, scope, attr) {

      $log.debug('modalService->load', name);
      ;
      var settings = angular.extend({
        scope: scope,
        animation: 'slide-in-up'
      }, attr);
      console.log(settings);

      $ionicModal.fromTemplateUrl('templates/modal/' + name + '.html', settings)
        .then(function (modal) {
          self.pages[name] = modal;
        });
    };

    self.open = function (name) {
      $log.debug('modalService->open', name);
      self.pages[name].show();
    };

    self.close = function (name) {
      $log.debug('modalService->close', name);
      self.pages[name].hide();
    };
  });