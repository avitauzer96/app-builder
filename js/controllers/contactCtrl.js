angular.module("feedsyApp.controllers.contactCtrl", ['ionic','feedsyApp.services.companyService'])
  .controller('contactCtrl', function ($scope, $rootScope, companyService, $ionicPopup, $log) {
    $log.debug('init contactCtrl');
    var isIOS = ionic.Platform.isIOS();
    var isAndroid = ionic.Platform.isAndroid();
    $scope.addedToContacts = false;
    $scope.addContacts = function (trading_name, office_name, company_website, company_mobile, company_address, company_email) {
      var adress = String(company_address).replace(/<[^>]+>/gm, '');
      // create a new contact
      var contact = navigator.contacts.create();
      if(isAndroid) {
        contact.displayName = trading_name;
      }
      else if(isIOS) {
        contact.name = trading_name;
      }
      //contact.displayName = trading_name;
     // contact.nickname = "nickname";
      contact.phoneNumbers = [new ContactField('work', company_mobile, true)];
      contact.emails = [new ContactField('work', company_email, false)];
      if(isAndroid) {
        contact.addresses = [new ContactAddress(true, 'work', adress, false, false, false, false)];
      }
      else if(isIOS) {
        contact.addresses = [new ContactAddress(true, 'work', false, adress, false, false, false)];
      }
      contact.urls = [new ContactField('work', company_website, false)];
      contact.organizations = [new ContactOrganization(true, 'work', trading_name, false, false)];
      contact.save(function (response) {
        $ionicPopup.alert({
            title: 'Nice one!',
            template: trading_name + ' added to contacts'
        }); 
        $scope.addedToContacts = true;
      }, function (contactError) {
        $scope.addedToContacts = true;
      });

    };

    $scope.devModeCounter = 0;
    $scope.tryEnableDevelopMode = function () {
      $scope.devModeCounter++;
      if ($scope.devModeCounter % 5 == 0) {
        $rootScope.devMode = !$rootScope.devMode;
        alert('Dev mode :' + $rootScope.devMode);
      }
    };
    
    $scope.title = "Contact";
    companyService.getInfo(function (info) {
      $log.debug("articleCtrl->getInfo");

      for (var i in info.additional_menu) {
        if (info.additional_menu[i].url == "contact") {
          $scope.title = info.additional_menu[i].title;
          break;
        }
      }
    });

  });