angular.module('feedsyApp.filters', [])
  .filter('separate', function () {
    return function (arr, div, val) {
      if (!arr || !arr.length) {
        return;
      }
      if (div === 1) {
        return arr;
      }
      return arr.filter(function (item, index) {
        return index % div === (val || 0);
      });
    };
  }).filter('htmlToPlaintext', function () {
    return function (text) {
      return String(text).replace(/<[^>]+>/gm, '');
    };
  }).filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function (val) {
      return $sce.trustAsResourceUrl(val);
    };
  }]).filter('trustAsHTML', ['$sce', function($sce) {
    return function (val) {
      return $sce.trustAsHtml(val);
    };
  }]).filter('trustAsUrl', ['$sce', function($sce) {
    return function (val) {
      return $sce.trustAsUrl(val);
    };
  }]);
