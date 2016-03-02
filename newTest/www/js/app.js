// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

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

    .state('menu.detailed', {
      url: '/logs/:aId',
      views: {
        'logs-page' : {
          templateUrl: 'templates/detailed.html',
          controller: 'namesCtrl'
        }
      }
    })
    $urlRouterProvider.otherwise('/menu/logs');
})

.controller('namesCtrl', ['$scope', '$state', function($scope, $state) {
    $scope.whichEntry = $state.params.aId;

    $scope.logs = [

        {date:'15/01/2015',entries:[
          {id:'150115b',time:'07:06',meal:'Breakfast',food:'Cereal, milk, orange juice',thoughts:'Feeling quite nervous',location:'Home',people:'Alone'},
          {id:'150115l',time:'13:25',meal:'Lunch',food:'Ham sandwich, crisps, apple',location:'School, college, uni',people:'Friends'},
          {id:'150115d',time:'19:02',meal:'Dinner',food:'Pasta and pesto',thoughts:'Proud of myself for eating 3 meals today',location:'Home',people:'Parents'}
        ]},

        {date:'28/02/2016',entries:[
          {id:'280216b',time:'07:06',meal:'Breakfast',food:'Cereal, milk, orange juice',thoughts:'Feeling quite nervous',location:'Home',people:'Alone'},
          {id:'280216l',time:'13:25',meal:'Lunch',food:'Ham sandwich, crisps, apple',location:'Home',people:'Alone'},
          {id:'280216d',time:'19:02',meal:'Dinner',food:'Pasta and pesto',thoughts:'Proud of myself for eating 3 meals today',location:'Restaurant, cafe'},
          {id:'280216a',time:'15:59',meal:'Afternoon Snack',food:'Packet of crisps'}
        ]},

        {date:'27/02/2016',entries:[
          {id:'270216b',time:'09:15',meal:'Breakfast',food:'Toast, jam, milk',thoughts:'So tired',location:'Home',people:'Alone'},
          {id:'270216d',time:'17:39',meal:'Dinner',food:'Pizza and chips',thoughts:'Feel so bad',location:'Friend\'s House',people:'Friends',purge:true}
        ]},

        {date:'25/02/2016',entries:[
          {id:'250216b',time:'08:42',meal:'Breakfast',food:'Pancakes with butter',thoughts:'Upset I had a big breakfast',location:'Home',people:'Parents'},
          {id:'250216a',time:'17:39',meal:'Afternoon Snack',food:'6 sausage rolls',thoughts:'Feel like a pig for having so many sausage rolls',location:'Outside',people:'Alone',binge:true}
        ]}   
    ];

    $scope.dayToFilter = "28/02/2016";

    $scope.onItemDelete = function(dayIndex, item) {
      $scope.logs[dayIndex].entries.splice($scope.logs[dayIndex].entries.indexOf(item), 1);
    };
}]);