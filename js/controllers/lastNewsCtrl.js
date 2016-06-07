angular.module("feedsyApp.controllers.lastNewsCtrl", [
  'feedsyApp.services.articlesService'
])
  .controller('lastNewsCtrl', function ($scope, $ionicSlideBoxDelegate, $ionicHistory, $state, $log, $window, articles, height, articlesService) {
    $log.debug('init lastNewsCtrl');
    $ionicSlideBoxDelegate.update();
    if ($scope.offline) {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('app.offline');
    }

    $scope.articles = articles;
    $scope.height = height + 75;
    $scope.showMore = function () {
      return (articles.length % 18 == 0 && articles.length != 0);
    };

    $scope.more = function () {
      articlesService.builder.last.more();
    };

    $scope.doRefresh = function(){
      articlesService.builder.last.get(function(response){
        $scope.articles = response;
        $scope.$broadcast('scroll.refreshComplete');
      });
    };
    
     $scope.options = {
        loop: true,
        autoplay: false,
        pager: false,
      };


  });