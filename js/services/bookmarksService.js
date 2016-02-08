angular.module('feedsyApp.services.bookmarksService', [
  'ionic.ion.imageCacheFactory',
  'feedsyApp.factories.localStorageFactory'
])
  .service('bookmarksService', function ($log, localStorageFactory, $ImageCacheFactory) {
    $log.debug('init bookmarksService');

    var self = this;

    self.bookmarks = localStorageFactory.getArray('bookmarks');

    self.get = function () {
      return self.bookmarks;
    };

    self.add = function (article) {
      if (article.bookmarked) {
        return false;
      }

      $ImageCacheFactory.Cache([article.img]);

      self.bookmarks.push(article);
      localStorageFactory.setObject('bookmarks', self.bookmarks);

      article.bookmarked = true;
    };

    self.remove = function (article) {
      return self.find(article, function (i) {
        self.bookmarks.splice(i, 1);
        localStorageFactory.setObject('bookmarks', self.bookmarks);
        article.bookmarked = false;
      });
    };

    self.find = function (article, callback) {

      for (var i in self.bookmarks) {
        if (self.bookmarks[i].ID == article.ID) {

          if (callback) {
            callback(i);
          }
          return true;
        }
      }
      return false;
    };

  });