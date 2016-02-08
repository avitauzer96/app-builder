/*angular.module('feedsyApp.services.newsService', [
  'feedsyApp.factories.apiFactory',
  'feedsyApp.services.bookmarksService',
  'feedsyApp.services.likeService'

])
  .service('newsService', function ($log, apiFactory, bookmarksService, likeService) {
    $log.debug('init newsService');

    var self = this;

    self.reset = function () {
      self.articles = [];
      self.page = 0;
      self.per_page = 15;
      self.searchQuery = null;
      self.category_id = null;
      self.activeMethod = null;
      self.callback = null;
      self.index = null;
    };

    self.setCategory = function (category_id) {
      $log.debug('newsService->setCategory', category_id);
      self.category_id = category_id;
    };

    self.setSearchQuery = function (searchQuery) {
      $log.debug('newsService->setSearchQuery', searchQuery);
      self.searchQuery = searchQuery;
    };

    self.setCallback = function (callback) {
      $log.debug('newsService->setCallback');
      self.callback = callback;
    };

    self.setIndex = function (index) {
      $log.debug('newsService->setIndex', index);
      self.index = index;
    };

    self.nextIndex = function () {
      $log.debug('newsService->nextIndex', self.index);
      var index = self.index - 1;
      return (self.articles[index]) ? index : false;
    };

    self.prevIndex = function () {
      $log.debug('newsService->prevIndex', self.index);
      var index = self.index + 1;
      return (self.articles[index]) ? index : false;
    };

    self.more = function () {
      self.page++;
      $log.debug('newsService->more', self.page, self.activeMethod);
      self[self.activeMethod](self.callback);
    };


    self.transformNewsArticle = function (newsArticle) {
      newsArticle.bookmarked = bookmarksService.find(newsArticle);
      newsArticle.liked = likeService.find(newsArticle);
    };

    self.getArticles = function () {
      $log.debug('newsService->getArticles', self.articles);
      return self.articles;
    };

    self.getArticle = function () {
      $log.debug('newsService->getArticle', self.index, self.articles[self.index]);
      return self.articles[self.index];
    };

    self.getBookmarks = function () {
      self.activeMethod = 'getBookmarks';
      self.articles = bookmarksService.get();

      $log.debug('newsService->getBookmarks', self.articles);
      self.callback(self.articles);
    };

    self.getLastNews = function () {
      self.activeMethod = 'getLastNews';

      $log.debug('newsService->getLastNews', self.page);
      var url = 'news';
      if (self.articles.length > 0) {
        url += '/' + getLastID();
        url += '/' + getOffset();
      }
      return apiFactory.get(url).then(function (response) {
        var i;
        for (i in response) {
          self.transformNewsArticle(response[i]);
        }

        self.articles = self.articles.concat(response);
        return response(self.articles);
      });
    };

    self.getNewsByCategory = function () {
      self.activeMethod = 'getNewsByCategory';

      $log.debug('newsService->getNewsByCategory', self.category_id, self.page);
      var url = 'category/' + self.category_id;
      if (self.articles.length > 0) {
        url += '/' + getLastID();
        url += '/' + getOffset();
      }
      apiFactory.get(url).then(function (response) {
        for (var i in response)
          self.transformNewsArticle(response[i]);

        self.articles = self.articles.concat(response);

        self.callback(self.articles);
      });
    };


    self.getNewsBySearchQuery = function () {
      self.activeMethod = 'getNewsBySearchQuery';

      $log.debug('newsService->getNewsBySearchQuery', self.searchQuery, self.page);

      var url = 'search/' + self.searchQuery;
      if (self.articles.length > 0) {
        url += '/' + getLastID();
        url += '/' + getOffset();
      }
      apiFactory.get(url).then(function (response) {
        for (var i in response)
          self.transformNewsArticle(response[i]);

        self.articles = self.articles.concat(response);

        self.callback(self.articles);
      });
    };


    var getOffset = function () {
      return self.per_page * self.page;
    };

    var getLastID = function () {
      return self.articles[self.articles.length - 1].ID;
    };
  });*/