angular.module('starter.controllers', ['starter.services', 'ngCordova'])

.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.controller('mainCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  }
})

.controller('MyCtrl', function($scope, Camera) {

   $scope.takePicture = function (options) {
  
      var options = {
         quality : 75,
         targetWidth: 200,
         targetHeight: 200,
         sourceType: 1
      };

      Camera.getPicture(options).then(function(imageData) {
         $scope.picture = imageData;;
      }, function(err) {
         console.log(err);
      });
    
   };

})

.controller('namesCtrl', ['$scope', '$state', '$http', function($scope, $state, $http) {
    $scope.whichEntry = $state.params.aId;

    $scope.clinician =  {
        "name": "Dr. John Watson",
        "address": "14B Baker Street",
        "Landline": "1234567",
        "mobile": "0283124893275",
        "office": "Weekdays only",
        "email": "j.watson69@yahoo.com"
    };

    $http.get('js/data.json').success(function(data) {
      $scope.logs = data;
    });

    // $scope.logs = [

    //     {date:'2015/01/15',entries:[
    //       {id:'150115b',time:'07:06',meal:'Breakfast',food:'Cereal, milk, orange juice',thoughts:'Feeling quite nervous',location:'Home',people:'Alone', complete:true},
    //       {id:'150115l',time:'13:25',meal:'Lunch',food:'Ham sandwich, crisps, apple',location:'School, college, uni',people:'Friends', complete:true},
    //       {id:'150115d',time:'19:02',meal:'Dinner',food:'Pasta and pesto',thoughts:'Proud of myself for eating 3 meals today',location:'Home',people:'Parents', complete:false}
    //     ]},

    //     {date:'2016/02/28',entries:[
    //       {id:'280216b',time:'07:06',meal:'Breakfast',food:'Cereal, milk, orange juice',thoughts:'Feeling quite nervous',location:'Home',people:'Alone', complete:true},
    //       {id:'280216l',time:'13:25',meal:'Lunch',food:'Ham sandwich, crisps, apple',location:'Home',people:'Alone', complete:false},
    //       {id:'280216d',time:'19:02',meal:'Dinner',food:'Pasta and pesto',thoughts:'Proud of myself for eating 3 meals today',location:'Restaurant, cafe', complete:true},
    //       {id:'280216a',time:'15:59',meal:'Afternoon Snack',food:'Packet of crisps', complete:true}
    //     ]},

    //     {date:'2016/02/27',entries:[
    //       {id:'270216b',time:'09:15',meal:'Breakfast',food:'Toast, jam, milk',thoughts:'So tired',location:'Home',people:'Alone', complete:true},
    //       {id:'270216d',time:'17:39',meal:'Dinner',food:'Pizza and chips',thoughts:'Feel so bad',location:'Friend\'s House',people:'Friends',purge:true, complete:true}
    //     ]},

    //     {date:'2016/02/25',entries:[
    //       {id:'250216b',time:'08:42',meal:'Breakfast',food:'Pancakes with butter',thoughts:'Upset I had a big breakfast',location:'Home',people:'Parents', complete:false},
    //       {id:'250216a',time:'17:39',meal:'Afternoon Snack',food:'6 sausage rolls',thoughts:'Feel like a pig for having so many sausage rolls',location:'Outside',people:'Alone',binge:true, complete:true}
    //     ]},

    //     {date:'2016/03/09',entries:[
    //       {id:'090316b',time:'07:06',meal:'Breakfast',food:'Cereal, milk, orange juice',thoughts:'Feeling quite nervous',location:'Home',people:'Alone', complete:true},
    //       {id:'090316l',time:'13:25',meal:'Lunch',food:'Ham sandwich, crisps, apple',location:'Home',people:'Alone', complete:true},
    //       {id:'090316d',time:'19:02',meal:'Dinner',food:'Pasta and pesto',thoughts:'Proud of myself for eating 3 meals today',location:'Restaurant, cafe', complete:true},
    //       {id:'090316a',time:'15:59',meal:'Afternoon Snack',food:'Packet of crisps', complete:false}
    //     ]}   
    // ];

    $scope.goals = [
          {id:'today',meal:'Breakfast',food:'Cereal, milk, orange juice',location:'Home',people:'Alone'},
          {id:'today',meal:'Lunch',food:'Ham sandwich, crisps, apple',location:'School, college, uni',people:'Friends'},
          {id:'today',meal:'Dinner',food:'Pasta and pesto',location:'Home',people:'Parents'}
    ];

    $scope.sumMeals = function() {
      var total = 0;
        for(var i = 0; i <= $scope.goals.length; i++){
            total = i;
        }
      return total;
    };

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

    $scope.add = function() {
      $state.go('menu.goalsInput');
    };
    $scope.submit = function() { 
      $state.go('menu.goals'); 
    };
    $scope.cancel = function() { 
      $state.go('menu.settings'); 
    };
}]);