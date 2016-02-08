angular.module("feedsyApp.controllers.searchCtrl", [
  'feedsyApp.services.articlesService'
])
  .controller('searchCtrl', function ($scope, $log, $stateParams, articles, articlesService) {
    $log.debug('init searchCtrl');

    $scope.more = function () {
      articlesService.builder.search.more();
    };

    $scope.articles = articles;

    $scope.showMore = function () {
      return (articles.length % 18 == 0 && articles.length != 0);
    };

    $scope.doRefresh = function(){
      articlesService.builder.search.get($stateParams.query, function(response){
        $scope.articles = response;
        $scope.$broadcast('scroll.refreshComplete');
      });
    };

  });