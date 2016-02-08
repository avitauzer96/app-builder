angular.module("feedsyApp.controllers.categoryCtrl", [
  'feedsyApp.services.articlesService'
])
  .controller('categoryCtrl', function ($scope, $log, $stateParams, articles, articlesService) {

    $log.debug('init categoryCtrl');

    $scope.more = function () {
      articlesService.builder.category.more();
    };

    $scope.emptyMessage = "Category is empty";

    $scope.articles = articles;

    $scope.showMore = function () {
      return (articles.length % 18 == 0 && articles.length != 0);
    };

    $scope.doRefresh = function(){
      articlesService.builder.category.get($stateParams.id, function(response){
          $scope.articles = response;
          $scope.$broadcast('scroll.refreshComplete');
      });
    };


  });