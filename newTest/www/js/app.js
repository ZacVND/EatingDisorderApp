// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
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
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('menu', {
      url: '/menu',
      abstract: true,
      templateUrl: 'templates/menu.html'
    })

    .state('menu.logs', {
      url: '/logs',
      views: {
        'logs-page' : {
          templateUrl: 'templates/logs.html',
          controller: 'namesCtrl'
        }
      }
    })

    .state('menu.input', {
      url: '/input',
      views: {
        'input-page' : {
          templateUrl: 'templates/input.html',
          controller: 'namesCtrl'
        }
      }
    })

    .state('menu.detailed', {
      url: '/logs/:aId',
      views: {
        'logs-page' : {
          templateUrl: 'templates/detailed.html',
          controller: 'namesCtrl'
        }
      }
    })

    .state('menu.help', {
      url: '/help',
      views: {
        'help-page' : {
          templateUrl: 'templates/help.html',
          controller: 'namesCtrl'
        }
      }
    })

    .state('menu.home', {
      url: '/home',
      views: {
        'home-page' : {
          templateUrl: 'templates/home.html',
          controller: 'namesCtrl'
        }
      }
    })

    .state('menu.settings', {
      url: '/settings',
      views: {
        'settings-page' : {
          templateUrl: 'templates/settings.html',
          controller: 'namesCtrl'
        }
      }
    })

    .state('menu.goals', {
      url: '/goals',
      views: {
        'goals-page' : {
          templateUrl: 'templates/goals.html',
          controller: 'namesCtrl'
        }
      }
    })
    $urlRouterProvider.otherwise('/menu/home');
});