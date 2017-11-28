/*Ionic Starter App*/
angular.module('HezecomApp',[
      'ionic',
      'ngCordova',
      'jett.ionic.filter.bar',
      'ionic-modal-select',
      'ion-datetime-picker',
      'ion-floating-menu',
      'htsApp.controllers',
      'htsApp.services',
      'htsApp.constants'
    ])

.run(function($ionicPlatform , $rootScope, $location, HTSServices,$ionicPopup) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    /*if(window.Connection) {
      if(navigator.connection.type == Connection.NONE) {
        $ionicPopup.confirm({
          title: 'No Internet Connection',
          content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
        })
            .then(function(result) {
              if(!result) {
                ionic.Platform.exitApp();
              }
            });
      }
    }*/
  });

  $rootScope.authStatus = false;
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    $rootScope.authStatus = toState.authStatus;
    /*if ($rootScope.authStatus===true && HTSServices.UsersAuth()===null) {
      $location.path('/login');
    }*/
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    cache: false,
    templateUrl: 'app/templates/others/menu.html',
    controller: 'DashCtrl'
  })

  .state('app.dashboard', {
    url: '/dashboard',
    views: {
      'menuContent': {
        templateUrl: 'app/templates/others/dashboard.html',
		controller: 'DashCtrl'
      }
     }
  })
  .state('app.dashboard2', {
    url: '/dashboard/:ndate',
    views: {
      'menuContent': {
        templateUrl: 'app/templates/others/dashboard.html',
		controller: 'DashCtrl'
      }
     }
  })
  .state('app.dashboard3/:lang', {
    url: '/dashboard',
    views: {
      'menuContent': {
        templateUrl: 'app/templates/others/dashboard.html',
		controller: 'DashCtrl'
      }
     }
  })
  .state('app.dashboard4/:lang/:nDate', {
    url: '/dashboard',
    views: {
      'menuContent': {
        templateUrl: 'app/templates/others/dashboard.html',
		controller: 'DashCtrl'
      }
     }
  })

  $urlRouterProvider.otherwise('/app/dashboard');
});
