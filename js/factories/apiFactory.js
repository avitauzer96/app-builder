angular.module('feedsyApp.factories.apiFactory', [
  'feedsyApp.factories.loadingFactory'
])
  .factory('apiFactory', function ($log, $http, $rootScope, loadingFactory, $q, $sce, API_URL) {
    $log.debug('init apiFactory');

    var EncodeQueryData = function (data) {
      var ret = [];
      for (var d in data)
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
      return ret.join("&");
    };

    var get_json = function (name, params) {
      loadingFactory.show();
      $log.debug('apiFactory->get_json', name);

      var deferred = $q.defer();

      var url = API_URL + '/' + name;
      if (params)
        url += '?' + EncodeQueryData(params);

      $http.get(url)
        .success(function (data) {
          $rootScope.online = true;
          $rootScope.offline = false;
          loadingFactory.hide();
          deferred.resolve(angular.fromJson(data));
        })
        .error(function (data, status) {
          $rootScope.online = false;
          $rootScope.offline = true;
          loadingFactory.hide();
          deferred.resolve(data);
        });

      return deferred.promise;
    };

    var post_json = function (name, params) {
      loadingFactory.show();
      $log.debug('apiFactory->post_json', name);

      var deferred = $q.defer();
      $http.post(API_URL + '/' + name, params)
        .success(function (data) {
          $rootScope.online = true;
          $rootScope.offline = false;
          loadingFactory.hide();
          deferred.resolve(angular.fromJson(data));
        })
        .error(function (data, status) {
          $rootScope.online = false;
          $rootScope.offline = true;
          loadingFactory.hide();
          deferred.reject(data);
        });

      return deferred.promise;
    };

    return {
      get: get_json,
      post: post_json
    }

  });