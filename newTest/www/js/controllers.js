angular.module('starter.controllers', ['ngCordova'])

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

.controller('camCtrl', function($scope, $cordovaCamera){
  $scope.takePhoto = function () {    // This code is for taking the photo and storing it into the phone's gallery
    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: true
  };

      $cordovaCamera.getPicture(options).then(function (imageData) {
          $scope.imgURI = "data:image/jpeg;base64," + imageData;
      }, function (err) {
          console.err(err);
      });
  }

  $scope.choosePhoto = function () {    //This code is for choosing the photo from the gallery
    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
  };

    $cordovaCamera.getPicture(options).then(function (imageData) {
        $scope.imgURI = "data:image/jpeg;base64," + imageData;
    }, function (err) {
        console.err(err);
    });
  }
})

.controller('IntroCtrl', function($scope, $state) {
  //delete the line below to prevent the intro page from popping up
  window.localStorage['seenIntro'] = false;

  $scope.startApp = function() {
    $state.go('menu.home');

    // Set a flag that we finished the tutorial
    window.localStorage['seenIntro'] = true;
  };

  if(window.localStorage['seenIntro'] === "true") {
    console.log('Skip intro');
    $state.go('menu.home');
  }
  // Move to help page
  $scope.toHelp = function() {
    $state.go("menu.help");
    window.localStorage['seenIntro'] = true;
  };

})

.controller('logsCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.whichEntry = $state.params.aId

    $scope.goalIn = function() {
      $state.go('menu.goals_input')
    }

    $http.get('js/cuteanimals.json').success(function(data) {
      $scope.animals = data.photos.photo;
      $scope.photo = $scope.animals[Math.floor(Math.random()*$scope.animals.length)];
    });

    $scope.logs = JSON.parse(window.localStorage['logs'] || '{"logsArray":[]}');

    var d = new moment();
    if(JSON.stringify($scope.logs).indexOf(d.format('YYYY/MM/DD')) == -1) {
      $scope.logs.logsArray.push({date:d.format('YYYY/MM/DD'),entries:[]});
    }

    $scope.goals = JSON.parse(window.localStorage['goals'] || '[]');

    $scope.todayHasGoals = function() {
      var d = new moment().format('YYYY/MM/DD');
      if(JSON.stringify($scope.goals).indexOf(d) == - 1) {
        return false;
      } else {
        return true;
      }
    };

    $scope.todaysDate = function(separator) {
      var d = new moment();
      return d.format('YYYY' + separator + 'MM' + separator + 'DD');
    };

    $scope.dateFilter = function(date) {
      date = String(date);
      if(date == "undefined" || date == "null")
      {
        return "";
      }
      var d = new moment(date);

      return d.format('YYYY/MM/DD');
    };

    $scope.getDisplayDate = function(date) {
      var d = new moment(date);

      if(d.year() != moment().year()) {
        return d.format('dddd Do MMMM YYYY');
      }
      return d.format('dddd Do MMMM');
    };

    $scope.getTimeAgo = function(date) {
      var d = moment($scope.todaysDate('-'));
      return moment(date, "YYYY/MM/DD").from(d);
    };

    $scope.onItemDelete = function(dayIndex, item) {
      var index = ($scope.logs.logsArray.length - dayIndex - 1);
      $scope.logs.logsArray[index].entries.splice($scope.logs.logsArray[index].entries.indexOf(item), 1);
      window.localStorage['logs'] = JSON.stringify($scope.logs);
    };

    $scope.onItemDeleteDetailed = function(dayIndex, item) {
      $scope.logs.logsArray[dayIndex].entries.splice($scope.logs.logsArray[dayIndex].entries.indexOf(item), 1);
      window.localStorage['logs'] = JSON.stringify($scope.logs);
    };

    $scope.deleteGoal = function(item) {
      $scope.goals.splice($scope.goals.indexOf(item), 1);
      window.localStorage['goals'] = JSON.stringify($scope.goals);
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

    $scope.goalDates = ["Today", "Tomorrow", "Other"];

    $scope.goalEntry = {
      completed: false
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
          var x = document.getElementById("timePicker").value;
          $scope.entry.time = x;
          break;
      }
    };

    var setDateSelection = function(index) {
      var b = new moment(); 
      switch(index) {
        case 0:
          b = b.format('YYYY/MM/DD');
          $scope.goalEntry.date = b;
          break;
        case 1:
          b = b.add(1, 'days').format('YYYY/MM/DD');
          $scope.goalEntry.date = b;
          break;
        case 2:
          var x = document.getElementById("goalDate").value;
          $scope.goalEntry.date = new moment(x).format('YYYY/MM/DD');
          break;
      }
    };

    createdID = function(meal) {
      var str = moment().format('DDMMYY');
      if(meal) {
        meal = String(meal);
        str += meal.toLowerCase().substr(0, 1);
      } else {
        str += 'o';
        var i = 0;
        do {
          var testId = str + i;
          if(JSON.stringify($scope.logs.logsArray[($scope.logs.logsArray.length - 1)].entries).indexOf(testId) == - 1) {
            str += i;
            break;
          } else {
            i++;
          }
        } while (true);
      }
      return str;
    };

    goalID = function() {
      var i = 0;
        do {
          if(JSON.stringify($scope.goals).indexOf(i) == - 1) {
            return i;
          } else {
            i++;
          }
        } while (true);
    };

    // To submit an entry
    $scope.submit = function(indexedTime, purge) {
      if(indexedTime) {
        setTimeSelection($scope.timeIndex);
      } else {
        $scope.entry.time = moment().format('HH:mm');
      }

      if(purge) {
        console.log("This post was a purge");
        $scope.entry.purge = true;
      }      

      $scope.entry.id = createdID($scope.entry.meal);
      console.log("ID: " + $scope.entry.id);
      
      var log = angular.copy($scope.logs);
      log.logsArray[log.logsArray.length - 1].entries.push($scope.entry);

      window.localStorage['logs'] = JSON.stringify(log);

      $scope.logs = JSON.parse(window.localStorage['logs']);
    };

    // To submit a goal
    $scope.submitGoal = function() {
      var goal = angular.copy($scope.goals);
      setDateSelection($scope.timeIndex);
      $scope.goalEntry.id = goalID();

      goal.push($scope.goalEntry);
      window.localStorage['goals'] = JSON.stringify(goal);
      $scope.goals = JSON.parse(window.localStorage['goals']);
    };

    $scope.updateGoals = function() {
      window.localStorage['goals'] = JSON.stringify($scope.goals);
    };

}]);