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


.controller('logsCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.whichEntry = $state.params.aId


    $http.get('js/cuteanimals.json').success(function(data) {
      $scope.animals = data.photos.photo;
      $scope.photo = $scope.animals[Math.floor(Math.random()*$scope.animals.length)];
    });

    $scope.logs = JSON.parse(window.localStorage['logs'] || '{"logsArray":[]}');

    var d = new moment();
    if(JSON.stringify($scope.logs).indexOf(d.format('YYYY/MM/DD')) == -1) {
      $scope.logs.logsArray.push({date:d.format('YYYY/MM/DD'),entries:[]});
    }


    $scope.goals = [
          {"date":"2016/03/24","goals":[
            {"id":"20160318g1","goal":"Eat my 5 a day","completed":"false"},
            {"id":"20160318g2","goal":"No binges today","completed":"false"}
          ]},
          {"date":"2016/03/06","goals":[
            {"id":"20160306g1","goal":"Don't make myself throw up after dinner","completed":"true"}
          ]},
          {"date":"2016/04/06","goals":[
          ]}
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
      var index = ($scope.logs.logsArray.length - dayIndex - 1);
      console.log($scope.logs.logsArray[index].entries);
      $scope.logs.logsArray[index].entries.splice($scope.logs.logsArray[index].entries.indexOf(item), 1);
      window.localStorage['logs'] = JSON.stringify($scope.logs);
    };

    $scope.onItemDeleteDetailed = function(dayIndex, item) {
      console.log("dayIndex: " + dayIndex);
      $scope.logs.logsArray[dayIndex].entries.splice($scope.logs.logsArray[dayIndex].entries.indexOf(item), 1);
    };

    // Input controls
    $scope.meals = [
      {meal:"Breakfast", value:"bf"},
      {meal:"Morning Snack", value:"ms"},
      {meal:"Lunch", value:"lu"},
      {meal:"Afternoon Snack", value:"as"},
      {meal:"Dinner", value:"di"},
      {meal:"Evening Snack", value:"es"}
    ];

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

    $scope.timeIndex = 0;

    $scope.setTimeIndex = function(index) {
      $scope.timeIndex = index;
    };

    $scope.timePickerValue = {
      value: new Date(1970, 0, 1, 0, 0, 0)
    };

    $scope.locations = ["Home","School, college, uni","Work","Friend's House","Restaurant, cafe, etc.","Other"];

    $scope.people = ["Alone","Parents","Friends","Other"];

    $scope.entry = {
      binge: false,
      purge: false
    };

    // To convert time selection into a real time
    var setTimeSelection = function(index) {
      var b = new moment(); 
      switch(index) {
        case 0:
          b = b.subtract(10, 'minutes').format('HH:mm');
          $scope.entry.time = b;
          break;
        case 1:
          b = b.subtract(30, 'minutes').format('HH:mm');
          $scope.entry.time = b;
          break;
        case 2:
          //b = new moment($scope.selectedTime).format('HH:mm');
          console.log("time picker value: " + $scope.timePickerValue.value);
          $scope.entry.timeOfEntry = $scope.timePickerValue.value;
          break;
      }
    };

    createdID = function(meal) {
      var str = moment().format('DDMMYY');
      if(meal) {
        meal = String(meal);
        str += meal.toLowerCase().substr(0, 1);
      } else {
        str += 0
      }
      $scope.entry.id = str;
    };

    // To submit an input
    $scope.submit = function() {
      setTimeSelection($scope.timeIndex);

      createdID($scope.entry.meal);

      // $scope.logs.logsArray[$scope.logs.logsArray.length - 1].entries.push($scope.entry);
      var log = angular.copy($scope.logs);
      log.logsArray[log.logsArray.length - 1].entries.push($scope.entry);

      window.localStorage['logs'] = JSON.stringify(log);
      logsObj = JSON.parse(window.localStorage['logs'] || '{}');

      $scope.logs = logsObj;

      console.log("Inside submit: ");
      console.log($scope.logs);

    };

    console.log("End: ");
    console.log(JSON.parse(window.localStorage['logs'] || '{}'));
}]);