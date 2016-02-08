angular.module("feedsyApp.directives.extLink", [])
  .directive('extLink', function ($cordovaInAppBrowser) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var options = {
          location: 'yes',
          clearcache: 'yes',
          toolbar: 'no'
        };

        element.bind("click", function (event) {
          $cordovaInAppBrowser.open(attrs.href, '_system', options);

          event.preventDefault();

        });
      }
    };
  });