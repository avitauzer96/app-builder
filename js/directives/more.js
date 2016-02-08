angular.module("feedsyApp.directives.more", [])
  .directive('more', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      templateUrl: 'templates/directive/more.html'
    };
  });