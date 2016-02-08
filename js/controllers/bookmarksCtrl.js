angular.module("feedsyApp.controllers.bookmarkedCtrl", [])
  .controller('bookmarksCtrl', function ($scope, $log, articles) {
    $log.debug('init bookmarkedCtrl');

    $scope.emptyMessage = "You have nothing bookmarked";
    $scope.showMore = false;
    $scope.articles = articles;
  });