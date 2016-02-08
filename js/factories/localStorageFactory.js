angular.module('feedsyApp.factories.localStorageFactory', [])
  .constant('defaultValue', null)
  .factory('localStorageFactory', function ($window, defaultValue) {

    return {
      set: function (key, value) {
        $window.localStorage[key] = value;
      },
      get: function (key) {
        return $window.localStorage[key] || defaultValue;
      },
      setObject: function (key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function (key) {
        return JSON.parse($window.localStorage[key] || '{}');
      },
      getArray: function (key) {
        return JSON.parse($window.localStorage[key] || '[]');
      },
    }
  });
