// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

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

.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
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
        'menuContent' : {
          templateUrl: 'templates/logs.html',
          controller: 'namesCtrl'
        }
      }
    })

    .state('menu.input', {
      url: '/input',
      views: {
        'menuContent' : {
          templateUrl: 'templates/input.html',
          controller: 'namesCtrl'
        }
      }
    })

    .state('menu.detailed', {
      url: '/logs/:aId',
      views: {
        'menuContent' : {
          templateUrl: 'templates/detailed.html',
          controller: 'namesCtrl'
        }
      }
    })

    .state('menu.help', {
      url: '/help',
      views: {
        'menuContent' : {
          templateUrl: 'templates/help.html',
          controller: 'namesCtrl'
        }
      }
    })

    .state('menu.home', {
      url: '/home',
      views: {
        'menuContent' : {
          templateUrl: 'templates/home.html',
          controller: 'namesCtrl'
        }
      }
    })

    .state('menu.settings', {
      url: '/settings',
      views: {
        'menuContent' : {
          templateUrl: 'templates/settings.html',
          controller: 'namesCtrl'
        }
      }
    })

    .state('menu.goals', {
      url: '/goals',
      views: {
        'menuContent' : {
          templateUrl: 'templates/goals.html',
          controller: 'goalInputCtrl'
        }
      }
    })

    .state('menu.goalsInput', {
      url: '/goalsInput',
      views: {
        'menuContent' : {
          templateUrl: 'templates/goals_input.html',
          controller: 'goalInputCtrl'
        }
      }
    })
    $urlRouterProvider.otherwise('/menu/home');
});