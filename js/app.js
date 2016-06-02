angular.module('feedsyApp', [
  'ionic',
  'ngCordova',
  'ngIOS9UIWebViewPatch',
  'ionic.ion.imageCacheFactory',
  'feedsyApp.services',
  'feedsyApp.factories',
  'feedsyApp.filters',
  'feedsyApp.templates',
  'feedsyApp.controllers',
  'feedsyApp.directives'
])
  .constant('APP_PATH', '@@appPath')
  .constant('APP_NAME', '@@appName')
  .constant('APP_VERSION', '@@appVersion')
  .constant('API_URL', '@@apiURL')
  .config(function ($logProvider) {
    $logProvider.debugEnabled(true);
  
  })
  .config(function($ionicConfigProvider,$animateProvider) {
    $ionicConfigProvider.backButton.text('').icon('ion-home');
    $animateProvider.classNameFilter(/^((?!(no-animate)).)*$/);
  })
  .config(function ($stateProvider, $urlRouterProvider, APP_NAME) {
    $stateProvider
      .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/template.html",
        controller: 'appCtrl'
      })
      .state('app.offline', {
        url: "/offline",
        templateUrl: "templates/content/offline.html",
        controller: 'offlineCtrl'
      })
      .state('app.last_news', {
        url: "/last_news",
        templateUrl: "templates/content/lastNews.html",
        controller: 'lastNewsCtrl',
        resolve: {
          articles: function (articlesService) {
            return articlesService.builder.last.get();
          }
        },
        onEnter: function ($rootScope, $ionicHistory) {
            
          $ionicHistory.clearHistory();
          $ionicHistory.nextViewOptions({
            disableBack: true,
            historyRoot: true
          });
          $rootScope.navTitle = APP_NAME;
        }
      })
      .state('app.article', {
        url: "/news/article/:id",
        templateUrl: "templates/content/article.html",
        controller: 'articleCtrl',
        resolve: {
          article: function (articlesService) {
            return articlesService.builder.get();
          }
        },
        onEnter: function ($rootScope) {
          $rootScope.navTitle = APP_NAME;
        }
      })
      .state('app.category', {
        url: "/news/category/:id",
        templateUrl: "templates/content/category.html",
        controller: 'categoryCtrl',
        resolve: {
          articles: function (articlesService, $stateParams) {
            return articlesService.builder.category.get($stateParams.id);
          }
        },
        onEnter: function ($rootScope, $stateParams, categoriesService, $ionicHistory ) {
          $ionicHistory.clearHistory();
          $ionicHistory.nextViewOptions({
            disableBack: true,
            historyRoot: true
          });
          $rootScope.navTitle = categoriesService.getTitleCategory($stateParams.id);
        }
      })
      .state('app.search', {
        url: "/search/:query",
        templateUrl: "templates/content/search.html",
        controller: 'searchCtrl',
        resolve: {
          articles: function (articlesService, $stateParams) {
            return articlesService.builder.search.get($stateParams.query);
          }
        },
        onEnter: function ($rootScope) {
          $rootScope.navTitle = 'Search';
        }
      })
      .state('app.bookmarks', {
        url: "/bookmarks",
        templateUrl: "templates/content/bookmarks.html",
        controller: 'bookmarksCtrl',
        resolve: {
          articles: function (articlesService) {
            return articlesService.builder.bookmarks.get();
          }
        },
        onEnter: function ($rootScope) {
          $rootScope.navTitle = 'Bookmarked';
        }
      })
      .state('app.contact', {
        url: "/contact",
        templateUrl: "templates/content/contact.html",
        controller: 'contactCtrl',
        onEnter: function ($rootScope) {
          $rootScope.navTitle = APP_NAME;
        }
      })
      .state('app.portfolio', {
        url: "/portfolio",
        templateUrl: "templates/content/portfolio.html",
        controller: 'portfolioCtrl',
        onEnter: function ($rootScope) {
          $rootScope.navTitle = APP_NAME;
        }
      })
      .state('app.development', {
        url: "/development",
        templateUrl: "templates/content/development.html",
        controller: 'developmentCtrl',
        onEnter: function ($rootScope) {
          $rootScope.navTitle = 'Development';
        }
      })
      .state('app.page', {
        url: "/page/:tag",
        templateUrl: "templates/content/page.html",
        controller: 'pageCtrl',
        onEnter: function ($rootScope) {
          $rootScope.navTitle = APP_NAME;
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/last_news');
  })
  .run(function ($ionicPlatform, $rootScope, $timeout, $ionicPopup, $ionicSlideBoxDelegate, $ionicHistory, $state, gaFactory) {
    $rootScope.plugins = {};
    $rootScope.devMode = false;
    $ionicPlatform.ready(function () {
      document.addEventListener("deviceready", onDeviceReady, false);


      /*$rootScope.$on("$stateChangeSuccess", function handleRouteChangeEvent() {
        if ($state.current.name == 'app.last_news') {
          $timeout(function () {
            $ionicSlideBoxDelegate.update();
          }, 100);

        }
      });*/

      $rootScope.$on('$viewContentLoading',
        function (event, viewConfig) {


          if ($rootScope.offline) {
            $ionicHistory.nextViewOptions({
              disableBack: true
            });
            $state.go('app.offline');
          }
        });


      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      
      //Init Google Analytics
      gaFactory.init(function (response) {
        $rootScope.plugins.ga = response;
      });
      if(window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.hide();
          ionic.Platform.fullScreen();
      }

    });



    function onDeviceReady(){
      //Add Pause event listener for autolock
      window.addEventListener("pause", onPause, false);

      //Add Resume event listener for autolock
      window.addEventListener("resume", onResume, false);

    };

    function onResume() {
       var iframe = document.getElementsByTagName("iframe");
       var func = 'playVideo';
       if (typeof iframe != "undefined") {
          for (i = 0; i < iframe.length; i++) {   
              iframe[i].contentWindow.postMessage('{"event":"command","func":"' + func + '","args":""}','*');
          }
       }
    }

    function onPause() {
       var iframe = document.getElementsByTagName("iframe");
       var func = 'pauseVideo';
       if (typeof iframe != "undefined") {
          for (i = 0; i < iframe.length; i++) {   
              iframe[i].contentWindow.postMessage('{"event":"command","func":"' + func + '","args":""}','*');
          }
       }
    }
    
  })
  .controller('appCtrl', function ($scope, $rootScope, $state, $window,  $location, $log, $ionicHistory,
                                   modalService, bookmarksService, $ionicSlideBoxDelegate, $ionicNavBarDelegate,
                                   articlesService, categoriesService, $ionicPopup, $ionicViewSwitcher,
                                   likeService, companyService, PushWooshService) {
                                     

    $log.debug('init appCtrl');
    modalService.init($scope);

    document.addEventListener("pause", onPause, false);

    function onPause() {
       var iframe = document.getElementsByTagName("iframe");

       if (typeof iframe != "undefined") {
          for (i = 0; i < iframe.length; i++) {   
              var func = 'pauseVideo';
              iframe[i].contentWindow.postMessage('{"event":"command","func":"' + func + '","args":""}','*');
          }
       }
    }

    $scope.$on("$ionicView.beforeLeave", function(event, data){ 
       var iframe = document.getElementsByTagName("iframe");

       if (typeof iframe != "undefined") {
          for (i = 0; i < iframe.length; i++) {        
              var func = 'pauseVideo';
              iframe[i].contentWindow.postMessage('{"event":"command","func":"' + func + '","args":""}','*');
          }
       }
    });

    PushWooshService.onPushNotification = function(notification){
      if (device.platform == 'Android') {
        $ionicPopup.alert({
          title: notification.title,
          template: notification.text
        }).then(function (res) {
                  //add news
        });
      } else {
        $ionicPopup.alert({
          title: notification.aps.alert
        }).then(function (res) {
          //add news
        });

      }
    };

    angular.element($window).bind('resize', function () {
      $log.debug('resize');
      $ionicSlideBoxDelegate.update();
      $rootScope.isLandscape = (window.innerWidth  > window.innerHeight);
      $rootScope.isPortrait =  !$rootScope.isLandscape;
      
      $rootScope.isMobile = false;
      
      if(/Mobi/.test(navigator.userAgent) && ionic.Platform.isAndroid()) {
          $rootScope.isMobile = true;
      }
      else {
        $rootScope.isMobile = (window.innerWidth <= 640 && $rootScope.isLandscape) || (window.innerHeight <= 640 && $rootScope.isPortrait);
      }
      $rootScope.isTablet = !$rootScope.isMobile;
      $rootScope.$digest();
    });


    categoriesService.init(function (categories) {
      $scope.categories = categories;
    });


    $rootScope.isLandscape = (window.innerWidth  > window.innerHeight);
    $rootScope.isPortrait =  !$rootScope.isLandscape;
    $rootScope.isMobile = false;
    if (/Mobi/.test(navigator.userAgent) && ionic.Platform.isAndroid()) {
        $rootScope.isMobile = true;
    }
    else {
        $rootScope.isMobile = (window.innerWidth <= 640 && $rootScope.isLandscape) || (window.innerHeight <= 640 && $rootScope.isPortrait);
    }
    
    $rootScope.isTablet = !$rootScope.isMobile;

    companyService.init(function (info) {
      $scope.info = info;
    });

    $scope.openModal = function (name) {
      modalService.open(name);
    };

    $scope.closeModal = function (name) {
      modalService.close(name);
    };

    $scope.goLatestNews = function () {
         $ionicHistory.nextViewOptions({
            disableBack: true,
            historyRoot: true
          });
        $ionicViewSwitcher.nextDirection("back");
        $state.go('app.last_news');
    };

    $rootScope.openArticle = function (index) {
      articlesService.builder.index.set(index);
      var article =  articlesService.builder.get();
      $window.location.href = '#/app/news/article/' + article.ID;
    };

    $rootScope.openCategory = function () {
      $ionicHistory.nextViewOptions({
        disableBack: true,
        historyRoot: true
      });
    };

    $scope.toggleCategories = function () {
      $scope.showMainMenu = !$scope.showMainMenu;
      $scope.showCategoriesMenu = !$scope.showCategoriesMenu;
    };

    $rootScope.bookmark = function (article, content) {
      if (article.bookmarked) {
        bookmarksService.remove(article);
      } else {
        bookmarksService.add(article, content);
      }
    };

    $rootScope.like = function (article) {

      if (!article.liked) {
        likeService.add(article);
      } else {
        likeService.remove(article);
      }

    };

    $rootScope.emptyMessage = "News not found";

    $rootScope.emptyMessageTitle = "Nothing Found";
    $rootScope.emptyMessageText = "Sorry, but nothing matched your search terms. Please try again with some different keywords.";


    $scope.getMenuClass = function (path) {
      return ($location.path() == "/app/" + path) ? "active" : "";
    };

    $scope.getMenuCategoriesClass = function (path) {
      path = 'news/category';
      return ($location.path().substr(5, path.length) === path && !$scope.showCategoriesMenu) ? "active" : "";
    };

    $rootScope.getBookmarksClass = function (article) {
      return bookmarksService.find(article) ? "active" : "";
    };
  });