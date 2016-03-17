angular.module('starter.controllers', [])

.controller('mainCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  }

  $scope.menuItems = [
    {title:"Home",icon:"home",page:"home"},
    {title:"Logs",icon:"clipboard",page:"logs"},
    {title:"Goals",icon:"ribbon-b",page:"goals"},
    {title:"Settings",icon:"gear-a",page:"settings"},
    {title:"Help",icon:"help-buoy",page:"help"}
  ];
})

.controller('inputCtrl', ['$scope', '$state', function($scope, $state) {
  $scope.meals = ["Breakfast","Morning Snack","Lunch","Afternoon Snack","Dinner","Evening Snack"];

  $scope.timeButtons = ["10 mins ago", "30 mins ago", "Other"];

  $scope.activeButton = 0;
  $scope.setActiveButton = function(index) {
    $scope.activeButton = index;
  };

  $scope.timeOther = false;
  $scope.setTimeOther = function(index) {
    if(index < 2) {
      $scope.timeOther = false;
    } else {
      $scope.timeOther = true;
    }
  };

  $scope.getCurrentTime = function() {
    var t = new moment();
    return t.format('HH:mm');
  };

  $scope.locations = ["Home","School, college, uni","Work","Friend's House","Restaurant, cafe, etc.","Other"];

  $scope.people = ["Alone","Parents","Friends","Other"];
}])

.controller('namesCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.whichEntry = $state.params.aId;

    $http.get('js/data.json').success(function(data) {
      $scope.logs = data.logs;
      var d = new moment();
      if(JSON.stringify($scope.logs).indexOf(d.format('YYYY/MM/DD')) == -1) {
        $scope.logs.push({date:d.format('YYYY/MM/DD'),entries:[]});
      }
    });

    $scope.goals = [
          {id:'bf01',meal:'Breakfast',food:'Cereal, milk, orange juice',location:'Home',people:'Alone'},
          {id:'lu01',meal:'Lunch',food:'Ham sandwich, crisps, apple',location:'School, college, uni',people:'Friends'},
          {id:'di01',meal:'Dinner',food:'Pasta and pesto',location:'Home',people:'Parents'}
    ];
    
    $scope.sumMeals = function() {
      var total = 0;
        for(var i = 0; i <= $scope.goals.length; i++){
            total = i;
        }
      return total;
    }

    $scope.todaysDate = function(separator) {
      var d = new moment();
      return d.format('YYYY' + separator + 'MM' + separator + 'DD');
    }

    $scope.dateFilter = function() {
      var date = String($scope.selectedDate);
      if(date == "undefined" || date == "null")
      {
        return "";
      }
      var d = new moment(date);

      return d.format('YYYY/MM/DD');
    }

    $scope.getDisplayDate = function(date) {
      var d = new moment(date);

      if(d.year() != moment().year()) {
        return d.format('dddd Do MMMM YYYY');
      }
      return d.format('dddd Do MMMM');
    }

    $scope.getTimeAgo = function(date) {
      var d = moment($scope.todaysDate('-'));
      return moment(date, "YYYY/MM/DD").from(d);
    }

    $scope.onItemDelete = function(dayIndex, item) {
      $scope.logs[dayIndex].entries.splice($scope.logs[dayIndex].entries.indexOf(item), 1);
    };
}]);