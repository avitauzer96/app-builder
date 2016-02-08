angular.module("feedsyApp.directives.articles", ['feedsyApp.services.articlesService'])
  .directive('articles', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      controller: function ($scope, articlesService, $http, API_URL) {

        $scope.getColumnWidth = function () {
          var count = $scope.getCountColumn();

          return 12 / count;
        };

        $scope.getColumns = function () {
          var i, columns = [], count =  $scope.getCountColumn();
          for (i = 0; i < count; i++) {
            columns.push(i);
          }
          return columns;
        };

        $scope.getCountColumn = function () {
          if ($scope.isMobile && $scope.isPortrait) {
            return 1;
          }

          if (($scope.isMobile && $scope.isLandscape) || ($scope.isTablet && $scope.isPortrait)) {
            return 2;
          }

          if ($scope.isTablet && $scope.isLandscape) {
            return 3;
          }
        };
      },
      templateUrl: 'templates/directive/articles.html'
    };
  });