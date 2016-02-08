angular.module('feedsyApp.services.likeService', [
  'feedsyApp.factories.localStorageFactory',
  'feedsyApp.factories.apiFactory'
])
  .service('likeService', function ($log, localStorageFactory, apiFactory) {
    $log.debug('init likeService');

    var self = this;

    self.likes = localStorageFactory.getArray('likes');

    self.get = function () {
      $log.debug('likeService->get');

      return self.likes;
    };

    self.add = function (article) {
      $log.debug('likeService->add', article);

      if (article.liked)
        return false;

      //TODO ADD UNIQUE USER ID
      apiFactory.get('like/' + article.ID).then(function (response) {
        self.likes.push(article.ID);

        localStorageFactory.setObject('likes', self.likes);

        article.liked = true;
        article.likes++;

      });
    };

    self.remove = function (article) {
      $log.debug('likeService->remove');

      return self.find(article, function (i) {
        self.likes.splice(i, 1);

        localStorageFactory.setObject('likes', self.likes);

        article.liked = false;

        if (article.likes > 0)
          article.likes--;
      });
    };

    self.find = function (article, callback) {
      $log.debug('likeService->find');
      for (var i in self.likes) {
        if (self.likes[i] == article.ID) {
          if (callback)
            callback(i);
          return true;
        }
      }
      return false;
    };
  });