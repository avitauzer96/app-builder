angular.module("feedsyApp.controllers.articleCtrl", [
  'feedsyApp.services.categoriesService'
])
  .controller('articleCtrl', function ($scope, $rootScope, $log, $window, $ionicActionSheet, article, $ionicHistory,
                                       articlesService, APP_NAME) {

    $log.debug('init articleCtrl', article);

    $scope.$watch('article', function () {
      $scope.haveNext = articlesService.builder.index.haveNext();
      $scope.havePrev = articlesService.builder.index.havePrev();
      $scope.nextID = articlesService.builder.index.getNextId();
      $scope.prevID = articlesService.builder.index.getPrevId();
    });

    $scope.prev = function () {
      $log.debug('prevArticle');
      if (!$scope.havePrev) {
        return;
      }
      articlesService.builder.index.num--;

    };

    $scope.next = function () {
      $log.debug('nextArticle');
      if (!$scope.haveNext) {
        return;
      }

      articlesService.builder.index.num++;

    };

    $scope.article = article;

    $scope.shareViaEmail = function () {
      $log.debug('shareViaEmail');
      if (!window.plugins) {
        return;
      }

      var subject = APP_NAME + ': ' + $scope.article.post_title,
        message = 'I saw this on the ' + APP_NAME + ' app and thought you might like to see it: \r\n';
      message += $scope.article.post_title + '\r\n';
      message += $scope.article.url + '\r';

      window.plugins.socialsharing.shareViaEmail(message, subject, null, null, null, $scope.article.img);
    };

    $scope.share = function () {
      $log.debug('share');
      if (!window.plugins) {
        return;
      }
      window.plugins.socialsharing.share($scope.article.post_title, null, $scope.article.img, $scope.article.url);
    }; 
  });