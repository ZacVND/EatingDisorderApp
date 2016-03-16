angular.module('starter.controllers', [])

.controller('mainCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  }

  $scope.menuItems = [
    {title:"Home",icon:"home",page:"home"},
    {title:"Logs",icon:"clipboard",page:"logs"},
    {title:"Goals",icon:"ribbon-b",page:"goals"},
    {title:"Help",icon:"help-buoy",page:"help"},
    {title:"Settings",icon:"gear-a",page:"settings"}
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

.controller('namesCtrl', ['$scope', '$state', function($scope, $state) {
    $scope.whichEntry = $state.params.aId;

    $scope.logs = [

        {date:'2015/01/15',entries:[
          {id:'150115b',time:'07:06',meal:'Breakfast',food:'Cereal, milk, orange juice',thoughts:'Feeling quite nervous',location:'Home',people:'Alone'},
          {id:'150115l',time:'13:25',meal:'Lunch',food:'Ham sandwich, crisps, apple',location:'School, college, uni',people:'Friends'},
          {id:'150115d',time:'19:02',meal:'Dinner',food:'Pasta and pesto',thoughts:'Proud of myself for eating 3 meals today',location:'Home',people:'Parents'}
        ]},

        {date:'2016/03/16',entries:[

        ]},

        {date:'2016/02/28',entries:[
          {id:'280216b',time:'07:06',meal:'Breakfast',food:'Cereal, milk, orange juice',thoughts:'Feeling quite nervous',location:'Home',people:'Alone'},
          {id:'280216l',time:'13:25',meal:'Lunch',food:'Ham sandwich, crisps, apple',location:'Home',people:'Alone'},
          {id:'280216d',time:'19:02',meal:'Dinner',food:'Pasta and pesto',thoughts:'Proud of myself for eating 3 meals today',location:'Restaurant, cafe'},
          {id:'280216a',time:'15:59',meal:'Afternoon Snack',food:'Packet of crisps'}
        ]},

        {date:'2016/02/27',entries:[
          {id:'270216b',time:'09:15',meal:'Breakfast',food:'Toast, jam, milk',thoughts:'So tired',location:'Home',people:'Alone'},
          {id:'270216d',time:'17:39',meal:'Dinner',food:'Pizza and chips',thoughts:'Feel so bad',location:'Friend\'s House',people:'Friends',purge:true}
        ]},

        {date:'2016/02/25',entries:[
          {id:'250216b',time:'08:42',meal:'Breakfast',food:'Pancakes with butter',thoughts:'Upset I had a big breakfast',location:'Home',people:'Parents'},
          {id:'250216a',time:'17:39',meal:'Afternoon Snack',food:'6 sausage rolls',thoughts:'Feel like a pig for having so many sausage rolls',location:'Outside',people:'Alone',binge:true}
        ]},

        {date:'2016/03/09',entries:[
          {id:'090316b',time:'07:06',meal:'Breakfast',food:'Cereal, milk, orange juice',thoughts:'Feeling quite nervous',location:'Home',people:'Alone'},
          {id:'090316l',time:'13:25',meal:'Lunch',food:'Ham sandwich, crisps, apple',location:'Home',people:'Alone'},
          {id:'090316d',time:'19:02',meal:'Dinner',food:'Pasta and pesto',thoughts:'Proud of myself for eating 3 meals today',location:'Restaurant, cafe'},
          {id:'090316a',time:'15:59',meal:'Afternoon Snack',food:'Packet of crisps'}
        ]}   
    ];

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