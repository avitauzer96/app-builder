angular.module('feedsyApp.services.articlesService', [
  'feedsyApp.factories.apiFactory',
  'feedsyApp.services.bookmarksService',
  'feedsyApp.services.likeService'
])
  .service('articlesService', function ($log, $sce, apiFactory, bookmarksService, likeService, $ionicHistory, loadingFactory) {
    $log.debug('init articlesService');

    var self = this;

    self.reset = function () {
      self.builder.articles = [];
      self.builder.page = 0;
    };

    self.builder = {
      articles: [],
      page: 0,
      per_page: 18,
      get: function () {
        return self.builder.articles[self.builder.index.num];
      },
      index: {
        num: 0,
        set: function (index) {
          $log.debug('articlesService->builder->index->set', index);
          self.builder.index.num = index;
        },
        haveNext: function () {
          var index = self.builder.index.num + 1;

          return (self.builder.articles[index] !== undefined);
        },
        havePrev: function () {
          var index = self.builder.index.num - 1;

          return (self.builder.articles[index] !== undefined);
        },
        getNextId: function () {
          $log.debug('articlesService->builder->getNextId');
          if (self.builder.index.haveNext()) {
            return self.builder.articles[self.builder.index.num + 1].ID;
          }
          return false;
        },
        getPrevId: function () {
          $log.debug('articlesService->builder->getPrevId');
          if (self.builder.index.havePrev()) {
            return self.builder.articles[self.builder.index.num - 1].ID;
          }
          return false;
        }
      },
      last: {
        url: function () {
          return 'news';
        },
        more: function () {
          self.builder.page++;
          var url = self.builder.last.url() + self.builder._append_offset();

          return self.builder._download(url).then(function (response) {
            for (var i=0; i < response.length; i++) {
              self.builder.articles.push( response[i] );
            }
            return response;
          });
        },
        get: function (callback) {
          self.builder.page = 0;
          var url = self.builder.last.url();

          var is_refresh = typeof callback == "function";

          if (self.builder._check_history('last') || is_refresh) {
            if(is_refresh) {
              loadingFactory.disable();
            }
            return self.builder._download(url).then(function (response) {
              self.builder.articles = response;
              if (is_refresh){
                loadingFactory.enable();
                callback(response);
              }
              return self.builder.articles;
            });
          }

          return self.builder.articles;
        }
      },
      category: {
        id: undefined,
        url: function () {
          return 'category/' + self.builder.category.id;
        },
        more: function () {
          self.builder.page++;
          var url = self.builder.category.url() + self.builder._append_offset();
          return self.builder._download(url).then(function (response) {
            for (var i=0; i < response.length; i++) {
              self.builder.articles.push( response[i] );
            }
            return response;
          });
        },
        get: function (id, callback) {
          self.builder.category.id = id;
          self.builder.page = 0;
          var url = self.builder.category.url(id);
          var is_refresh = typeof callback == "function";
          if (self.builder._check_history('category') || is_refresh) {
            if(is_refresh) {
              loadingFactory.disable();
            }
            return self.builder._download(url).then(function (response) {
              self.builder.articles = response;
              if (is_refresh){
                loadingFactory.enable();
                callback(response);
              }
              return self.builder.articles;
            });
          }

          return self.builder.articles;
        }
      },
      search: {
        query: undefined,
        url: function () {
          return 'search/' + self.builder.search.query;
        },
        more: function () {
          self.builder.page++;
          var url = self.builder.search.url() + self.builder._append_offset();
          return self.builder._download(url).then(function (response) {
            for (var i=0; i < response.length; i++) {
              self.builder.articles.push( response[i] );
            }
            return response;
          });
        },
        get: function (query, callback) {
          self.builder.search.query = query;
          self.builder.page = 0;
          var url = self.builder.search.url();
          var is_refresh = typeof callback == "function";
          if (self.builder._check_history('search') || is_refresh) {
            if(is_refresh) {
              loadingFactory.disable();
            }
            return self.builder._download(url).then(function (response) {
              self.builder.articles = response;
              if (is_refresh){
                loadingFactory.enable();
                callback(response);
              }
              return self.builder.articles;
            });
          }

          return self.builder.articles;
        }
      },
      bookmarks: {
        get: function () {
          self.builder.page = 0;
          self.builder.articles = self.builder._prepare(bookmarksService.get());
          return self.builder.articles;
        }
      },
      _download: function (url) {
        $log.debug('articlesService->builder->download request', url);
        return apiFactory.get(url).then(function (response) {
          $log.debug('articlesService->builder->download success');
          return self.builder._prepare(response);
        });
      },
      _prepare: function (response) {
        var i;
        for (i in response) {
          if (response.hasOwnProperty(i)) {

            response[i].bookmarked = bookmarksService.find(response[i]);
            response[i].liked = likeService.find(response[i]);

          }
        }
        return response;
      },
      _check_history: function (state) {
        //true - need download
        //false - no need download

        var current = $ionicHistory.currentView(),
          back = $ionicHistory.backView(),
          from_article;

        if (!current) {
          return true;
        }
        from_article = current.stateId.indexOf("app.article") > -1;

        //(!category)->article->category ( not back to category)
        if (from_article > -1 && state == 'category' && back && back.stateName !== 'app.category') {
          return true;
        }
        //*->article back
        if (from_article) {
          return false;
        }

        return true;
      },
      _append_offset: function () {
        var end = '';

        if (self.builder.articles.length > 0) {
          end += '/' + self.builder.per_page * self.builder.page;
        }
        return end;
      }
    };


  });