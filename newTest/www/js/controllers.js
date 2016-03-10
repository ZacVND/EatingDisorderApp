angular.module('starter.controllers', [])

.controller('mainCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  }
})

.controller('namesCtrl', ['$scope', '$state', function($scope, $state) {
    $scope.whichEntry = $state.params.aId;

    $scope.logs = [

        {date:'2015/01/15',entries:[
          {id:'150115b',time:'07:06',meal:'Breakfast',food:'Cereal, milk, orange juice',thoughts:'Feeling quite nervous',location:'Home',people:'Alone'},
          {id:'150115l',time:'13:25',meal:'Lunch',food:'Ham sandwich, crisps, apple',location:'School, college, uni',people:'Friends'},
          {id:'150115d',time:'19:02',meal:'Dinner',food:'Pasta and pesto',thoughts:'Proud of myself for eating 3 meals today',location:'Home',people:'Parents'}
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
      var d = new Date();
      var str = "";
      str += d.getFullYear() + separator; // Append the year and the first / to the string
      str += append0(d.getMonth() + 1) + separator; // Append the month and the second /
      str += append0(d.getDate());
      return str; 
    }

    $scope.dateFilter = function() {
      var date = String($scope.selectedDate);
      if(date == "undefined" || date == "null")
      {
        return "";
      }

      var year = date.slice(11, 15);
      var day = date.slice(8, 10);
      var month = strToMonth(date.slice(4,7));
      return year + "/" + month + "/" + day;
    }

    strToMonth = function(str) {
      switch(str) {
        case "Jan":
          return "01";
          break;
        case "Feb":
          return "02";
          break;
        case "Mar":
          return "03";
          break;
        case "Apr":
          return "04";
          break;
        case "May":
          return "05";
          break;
        case "Jun":
          return "06";
          break;
        case "Jul":
          return "07";
          break;
        case "Aug":
          return "08";
          break;
        case "Sep":
          return "09";
          break;
        case "Oct":
          return "10";
          break;
        case "Nov":
          return "11";
          break;
        case "Dec":
          return "12";
          break;
        default:
          return "01";
          break;
      }
    }

    append0 = function(val) {
      if(val < 10) {
        return "0" + (val); // If less than 10, an extra 0 must be added
      } else {
        return val;
      }
    }

    $scope.onItemDelete = function(dayIndex, item) {
      $scope.logs[dayIndex].entries.splice($scope.logs[dayIndex].entries.indexOf(item), 1);
    };
}]);