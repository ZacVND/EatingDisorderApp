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

.controller('namesCtrl', function($scope) {
    $scope.logs = [

        {date:'15/01/2015',entries:[
          {time:'07:06',meal:'Breakfast',food:'Cereal, milk, orange juice',thoughts:'Feeling quite nervous'},
          {time:'13:25',meal:'Lunch',food:'Ham sandwich, crisps, apple'},
          {time:'19:02',meal:'Dinner',food:'Pasta and pesto',thoughts:'Proud of myself for eating 3 meals today'}
        ]},

        {date:'28/02/2016',entries:[
          {time:'07:06',meal:'Breakfast',food:'Cereal, milk, orange juice',thoughts:'Feeling quite nervous'},
          {time:'13:25',meal:'Lunch',food:'Ham sandwich, crisps, apple'},
          {time:'19:02',meal:'Dinner',food:'Pasta and pesto',thoughts:'Proud of myself for eating 3 meals today'},
          {time:'15:59',meal:'Afternoon Snack',food:'Packet of crisps'}
        ]},

        {date:'27/02/2016',entries:[
          {time:'09:15',meal:'Breakfast',food:'Toast, jam, milk',thoughts:'So tired'},
          {time:'17:39',meal:'Dinner',food:'Pizza and chips',thoughts:'Feel so bad'}
        ]},

        {date:'25/02/2016',entries:[
          {time:'08:42',meal:'Breakfast',food:'Pancakes with butter',thoughts:'Upset I had a big breakfast'},
          {time:'17:39',meal:'Afternoon Snack',food:'6 sausage rolls',thoughts:'Feel like a pig for having so many sausage rolls'}
        ]}   
    ];

    $scope.dayToFilter = "28/02/2016";

    $scope.onItemDelete = function(dayIndex, item) {
      $scope.logs[dayIndex].entries.splice($scope.logs[dayIndex].entries.indexOf(item), 1);
    };
});