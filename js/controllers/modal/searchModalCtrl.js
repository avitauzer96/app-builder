angular.module("feedsyApp.controllers.modal.searchModalCtrl", [
  'feedsyApp.services.modalService'
])
  .controller('searchModalCtrl', function ($scope, $window, $log, modalService) {
    $log.debug('init searchModalCtrl');

    $scope.query = '';

    $scope.searchRequest = function () {
      $window.location.href = '#/app/search/' + $scope.query;
      modalService.close('search');
      $scope.query = '';
    }
  });