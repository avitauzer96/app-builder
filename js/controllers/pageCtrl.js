angular.module("feedsyApp.controllers.pageCtrl", [
  'feedsyApp.services.companyService'
])
  .controller('pageCtrl', function ($scope, $log, companyService, $stateParams) {


    companyService.getInfo(function (info) {
      $log.debug("articleCtrl->getInfo");

      for (var i in info.additional_menu) {
        if (info.additional_menu[i].url == "page/"+$stateParams.tag) {
          $scope.page = info.additional_menu[i];
          break;
        }
      }
    });


  });