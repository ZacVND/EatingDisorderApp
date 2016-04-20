// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ionic.service.core', 'ionic.service.analytics', 'pdf', 'starter.controllers', 'ngCordova', 'starter.services'])

.run(function($ionicPlatform, $ionicAnalytics) {
  $ionicPlatform.ready(function() {
    $ionicAnalytics.register();
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    if(navigator && navigator.splashscreen) {
      navigator.splashscreen.hide();
    }
  });
})

// Page Routing
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(0);
  $stateProvider
    .state('intro', {
      url: '/',
      templateUrl: 'templates/intro.html',
      controller: 'IntroCtrl'
    })
    .state('menu', {
      url: '/menu',
      abstract: true,
      templateUrl: 'templates/menu.html'
    })

    .state('menu.logs', {
      url: '/logs',
      views: {
        'menuContent' : { // menuContent is the name of the nav-view used by the menu
          templateUrl: 'templates/logs.html',
          controller: 'logsCtrl'
        }
      }
    })

    .state('menu.input', {
      url: '/input',
      views: {
        'menuContent' : { // all pages are part of menuContent
          templateUrl: 'templates/input.html',
          controller: 'logsCtrl'
        }
      }
    })

    .state('menu.input_thoughts', {
      url: '/input_thoughts',
      views: {
        'menuContent' : { // all pages are part of menuContent
          templateUrl: 'templates/input_thoughts.html',
          controller: 'logsCtrl'
        }
      }
    })

    .state('menu.input_purge', {
      url: '/input_purge',
      views: {
        'menuContent' : { // all pages are part of menuContent
          templateUrl: 'templates/input_purge.html',
          controller: 'logsCtrl'
        }
      }
    })

    .state('menu.edit_input', {
      url: '/input/:bId',
      views: {
        'menuContent' : { // all pages are part of menuContent
          templateUrl: 'templates/edit_input.html',
          controller: 'logsCtrl'
        }
      }
    })

    .state('menu.success', {
      url: '/success',
      views: {
        'menuContent' : { // all pages are part of menuContent
          templateUrl: 'templates/success.html',
          controller: 'successCtrl'
        }
      }
    })

    .state('menu.saved_quotes', {
      url: '/saved_quotes',
      views: {
        'menuContent' : { // all pages are part of menuContent
          templateUrl: 'templates/saved_quotes.html',
          controller: 'successCtrl'
        }
      }
    })

    .state('menu.detailed', {
      url: '/logs/:aId',
      views: {
        'menuContent' : {
          templateUrl: 'templates/detailed.html',
          controller: 'logsCtrl'
        }
      }
    })

    .state('menu.help', {
      url: '/help',
      views: {
        'menuContent' : {
          templateUrl: 'templates/help.html',
          controller: 'logsCtrl'
        }
      }
    })

    .state('menu.home', {
      url: '/home',
      views: {
        'menuContent' : {
          templateUrl: 'templates/home.html',
          controller: 'logsCtrl'
        }
      }
    })

    .state('menu.settings', {
      url: '/settings',
      views: {
        'menuContent' : {
          templateUrl: 'templates/settings.html',
          controller: 'ClinCtrl'
        }
      }
    })

    .state('menu.settingsEdit', {
      url: '/settingsEdit',
      views: {
        'menuContent' : {
          templateUrl: 'templates/settingsEdit.html',
          controller: 'ClinCtrl'
        }
      }
    })

    .state('menu.goals', {
      url: '/goals',
      views: {
        'menuContent' : {
          templateUrl: 'templates/goals.html',
          controller: 'logsCtrl'
        }
      }
    })

    .state('menu.goals_input', {
      url: '/goals_input',
      views: {
        'menuContent' : {
          templateUrl: 'templates/goals_input.html',
          controller: 'logsCtrl'
        }
      }
    })

    .state('menu.edit_goals_input', {
      url: '/goals_input/:cId',
      views: {
        'menuContent' : {
          templateUrl: 'templates/edit_goals_input.html',
          controller: 'logsCtrl'
        }
      }
    })

    $urlRouterProvider.otherwise('/'); // App opens up on the home page
});