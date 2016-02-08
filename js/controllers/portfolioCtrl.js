angular.module("feedsyApp.controllers.portfolioCtrl", [
  'feedsyApp.services.companyService'
])
  .controller('portfolioCtrl', function ($scope, companyService, $log) {
    $log.debug('init portfolioCtrl');
    $scope.title = "Portfolio";
    companyService.getInfo(function (info) {
      $log.debug("articleCtrl->getInfo");

      for (var i in info.additional_menu) {
        if (info.additional_menu[i].url == "portfolio") {
          $scope.title = info.additional_menu[i].title;
          break;
        }
      }
    });
  });