angular.module('feedsyApp.services.categoriesService', [
  'feedsyApp.factories.apiFactory'
])
  .service('categoriesService', function ($log, apiFactory) {
    $log.debug('init categoriesService');

    var self = this;
    self.categories = null;

    self.init = function (callback) {
      self.getCategories(callback);
    };

    self.setCategories = function (value) {
      $log.debug('categoriesService->setCategories');
      self.categories = value;
    };

    self.downloadCategories = function (callback) {
      $log.debug('categoriesService->downloadCategories');
      apiFactory.get('categories').then(function (response) {
        self.setCategories(response);
        callback(response);
      });
    };

    self.getTitleCategory = function (id) {
      $log.debug('categoriesService->getTitleCategory', id, self.categories);
      for (var i in self.categories) {
        var category = self.categories[i];

        if (category.cat_ID == id) {
          $log.debug('categoriesService->getTitleCategory found', category.cat_name);
          return category.cat_name;
        }
      }
    };

    self.getCategories = function (callback) {
      $log.debug('categoriesService->getCategories');

      if (!self.categories) {
        self.downloadCategories(callback);
      }
      else {
        callback(self.categories);
      }
    };
  });