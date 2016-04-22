angular.module('starter.controllers', ['ngCordova'])

.controller('mainCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  }

  $scope.menuItems = [
    {title:"Home",icon:"home",page:"home"},
    {title:"Logs",icon:"clipboard",page:"logs"},
    {title:"Goals",icon:"ribbon-b",page:"goals"},
    {title:"Saved Quotes",icon:"heart",page:"saved_quotes"},
    {title:"Settings",icon:"gear-a",page:"settings"},
    {title:"Help",icon:"help-buoy",page:"help"}
  ];
})

.controller('IntroCtrl', function($scope, $state) {
  //delete the line below to prevent the intro page from popping up

  if(window.localStorage['seenIntro'] === "true") {
    $state.go('menu.home');
    console.log('Skip intro');
  };

  $scope.seenIntro = window.localStorage['seenIntro'] || false;
  // Move to help page
  $scope.toHelp = function() {
    $state.go("menu.help");
    window.localStorage['seenIntro'] = true;
  };

})

.controller('ClinCtrl', ['$scope','$state','$localstorage', '$cordovaFile', '$cordovaEmailComposer', 
  function($scope, $state, $localstorage, $cordovaFile, $cordovaEmailComposer) {

  $scope.clinician = JSON.parse(window.localStorage['clinician'] || '{}');
  $scope.edit = function() {
    $state.go('menu.settingsEdit');
  };
  var logs = $localstorage.getObject('logs');
  $scope.submit = function(clinician) {
    $localstorage.setObject('clinician', $scope.clinician);
    $state.go('menu.settings');
    console.log(logs.logsArray);
  };

  $scope.sendEmail = function() {
        console.log("email function executed");
        var bodyText = "<h3>Hi, this is my Self-monitoring sheet of the last 50 meals</h3>";
        var attach;
        var pathFile = '';
        if(ionic.Platform.isIOS()) {
          pathFile = cordova.file.documentsDirectory;
        }
        else {
          pathFile = cordova.file.externalDataDirectory;
        }

        $cordovaFile.checkFile(pathFile, "report.pdf")
         .then(function (success) {
            attach = ['' + pathFile.replace('file://','') + "report.pdf"];
          }, function (error) {
            attach = [];
          });
        // ['' + cordova.file.documentsDirectory.replace('file://','') + "report.pdf"]
        $cordovaEmailComposer.isAvailable().then(function() {
           // is available
           var toC = $localstorage.getObject('clinician');
            var email = {
              to: toC.email,
              cc: '',
              bcc: '',
              attachments: attach,
              subject: 'My Self Monitoring Sheet',
              body: bodyText,
              isHtml: true
            };

          $cordovaEmailComposer.open(email).then(null, function () {
             // user cancelled email
          });
         }, function () {
           // not available
         });
    };  
}])

.controller('successCtrl', ['$scope', '$http', '$localstorage', 
  function($scope, $http, $localstorage) {

  $http.get('js/quotes.json').success(function(data) {
    $scope.quotes = data.quotesArray;
    $scope.quote = $scope.quotes[Math.floor(Math.random()*$scope.quotes.length)];
  });

  $scope.savedQuotes = JSON.parse(window.localStorage['savedQuotes'] || '{"array":[]}');
  // $scope.savedQuotes = $localstorage.getObject('savedQuotes', '{"array":[]}');

  $scope.saveQuote = function(quoteToSave) {
    if(JSON.stringify($scope.savedQuotes).indexOf(quoteToSave) == -1) {
      $scope.savedQuotes.array.push(quoteToSave);
      $localstorage.setObject('savedQuotes', $scope.savedQuotes);
    }
  };

  $scope.deleteQuote = function(index) {
    $scope.savedQuotes.array.splice(index, 1);
    $localstorage.setObject('savedQuotes', $scope.savedQuotes);
  };
}])

.controller('logsCtrl', ['$scope', '$ionicPopup', '$http', '$state', '$cordovaLocalNotification', '$localstorage',
 function($scope, $ionicPopup, $http, $state, $cordovaLocalNotification, $localstorage) {

    $scope.whichEntry = $state.params.aId;

    $scope.editWhich = $state.params.bId;

    $scope.editWhichGoal = $state.params.cId;

    $scope.goalIn = function() {
      $state.go('menu.goals_input')
    }

    $scope.logs = JSON.parse(window.localStorage['logs'] || '{"logsArray":[]}');

    var getEntryByID = function(id) {
       $scope.logs.logsArray.forEach(function(day) {
        day.entries.forEach(function(entry) {
          if(entry.id == id) {
            $scope.editEntry = entry;
          }
        });
      });
    }

    getEntryByID($scope.editWhich);

    var d = new moment();
    if(JSON.stringify($scope.logs).indexOf(d.format('YYYY/MM/DD')) == -1) {
      $scope.logs.logsArray.push({date:d.format('YYYY/MM/DD'),entries:[]});
    };

    $scope.logsPageAddLog = function() {
      $state.go('menu.input');
    }

    $scope.changePageToEdit = function(id) {
      document.location.href = "#/menu/input/" + id;
    };

    $scope.changePageToEditGoal = function(id) {
      document.location.href = "#/menu/goals_input/" + id;
    };

    $scope.goals = JSON.parse(window.localStorage['goals'] || '[]');

    var getGoalByID = function(id) {
      $scope.goals.forEach(function(goal) {
        if(goal.id == id) {
          $scope.editGoal = goal;
        }
      });
    };

    getGoalByID($scope.editWhichGoal);


    //This is the function which schedules all of the notifications
    $scope.notifications = JSON.parse(window.localStorage['notifications'] || 'false');

    $scope.notificationsChanged = function() {
      console.log($scope.notifications);
      var noon = new Date().setHours(11);
      // var alarmTime = new Date();
      //     console.log(alarmTime.setMinutes(alarmTime.getMinutes() + 1));
      console.log(noon);
      $localstorage.setObject('notifications', $scope.notifications);
        if ($localstorage.getObject('notifications') == true) {
          var alarmTime = new Date();
          alarmTime.setMinutes(alarmTime.getMinutes() + 1);
          $cordovaLocalNotification.schedule({
            id: 0,
            date: alarmTime,  
            message: "You haven't recorded anything for a week. Is everything alright?",
            title: "You haven't been recording your meals",
            autoCancel: false
          }).then(function() {
            
          });
          var noon = new Date().setHours(11);
          var afternoon = new Date().setHours(16);
          var night = new Date().setHours(22);
          $cordovaLocalNotification.schedule([{
              id: 3,
              message: "Time to record your Dinner log",
              firstAt: night,
              every: "hour",
              autoCancel: false
            },{
              id: 2,
              message: "Time to record your Lunch log",
              firstAt: afternoon,
              every: "hour",
              autoCancel: false
            },{
              id: 1,
              message: "Time to record your Breakfast log",
              firstAt: noon,
              every: "hour",
              autoCancel: false
          }]);
      }
      else {
        $cordovaLocalNotification.cancelAll();
      }
    }

    $scope.todayHasGoals = function() {
      var d = new moment().format('YYYY/MM/DD');
      if(JSON.stringify($scope.goals).indexOf(d) == - 1) {
        return false;
      } else {
        return true;
      }
    };

    $scope.hasUpcomingGoals = function() {
      var d = new moment().format('YYYY/MM/DD');
      var returnVal = false;
      $scope.goals.forEach(function(entry) {
        if(entry.date >= d) {
          returnVal = true;
        }
      });
      return returnVal;
    };

    $scope.hasPastGoals = function() {
      var d = new moment().format('YYYY/MM/DD');
      var returnVal = false;
      $scope.goals.forEach(function(entry) {
        if(entry.date < d) {
          returnVal = true;
        }
      });
      return returnVal;
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
      var res = date.split("/");
      var str = res[0] + " " + res[1] + " " + res[2];
      var d = new moment(str, "YYYY MM DD");

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
      purge: false,
      thoughts: "",
      food: "",
      location: "",
      people: "",
      meal: ""
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

    var createdID = function() {
      var str = moment().format('DDMMYY');
      str += 'e';
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
      return str;
    };

    var goalID = function() {
      var i = 0;
        do {
          if(JSON.stringify($scope.goals).indexOf(i) == - 1) {
            return i;
          } else {
            i++;
          }
        } while (true);
    };


    var validateEntry = function(entry) {
      // Meal selected but no food or drink entered
      if(entry.meal && !entry.food) {
        var alertPopup = $ionicPopup.alert({
          title: 'Almost there!',
          template: 'Don\'t forget to add what you ate and drank'
        });
        return false;
      }

      // Food and drink entered but no meal selected
      if(!entry.meal && entry.food) {
        var alertPopup = $ionicPopup.alert({
          title: 'Almost there!',
          template: 'Don\'t forget to select which meal this was'
        });
        return false;
      }

      // Classified as a binge but no food added or not selected meal
      if((entry.binge && !entry.food) || (entry.binge && !entry.food)) {
        var alertPopup = $ionicPopup.alert({
          title: 'Almost there!',
          template: 'Don\'t forget to select the meal and add what you ate and drank as part of this binge'
        });
        return false;
      }

      // Added a location but no food added or not selected meal
      if((entry.location && !entry.food) || (entry.location && !entry.food)) {
        var alertPopup = $ionicPopup.alert({
          title: 'Almost there!',
          template: 'Don\'t forget to select the meal and add what you ate and drank'
        });
        return false;
      }

      // Added people but no food added or not selected meal
      if((entry.people && !entry.food) || (entry.people && !entry.food)) {
        var alertPopup = $ionicPopup.alert({
          title: 'Almost there!',
          template: 'Don\'t forget to select the meal and add what you ate and drank'
        });
        return false;
      }

      // Inputted a time in the future
      d = new moment().format('HH:mm');
      if($scope.entry.time > d) {
        var alertPopup = $ionicPopup.alert({
          title: 'Not so fast!',
          template: 'You can\'t select a time in the future'
        });
        return false;
      }

      // A meal of this type has already been added today
      var notRepeat = true;
      $scope.logs.logsArray[($scope.logs.logsArray.length - 1)].entries.forEach(function(logsEntry) {
        if(logsEntry.meal == entry.meal) {
          if(entry.id != logsEntry.id) {
            var alertPopup = $ionicPopup.alert({
              title: 'Are you sure?',
              template: 'You\'ve already added an entry for this meal today. Perhaps you meant to select a different meal or you want to edit the other entry'
            });
            notRepeat = false;
          }
        }
      });
      return notRepeat;
    };

    var validateGoalEntry = function (goalEntry) {
      if(!goalEntry.goal) {
        var alertPopup = $ionicPopup.alert({
          title: 'Almost there!',
          template: 'Don\'t forget to enter a goal'
        });
        return false;
      }
      return true;
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

      var valid = validateEntry($scope.entry);

      if(valid) {
        $scope.entry.id = createdID();
        console.log("ID: " + $scope.entry.id);
        
        // This is the part which will cancel the scheduled notifications

        if ($scope.entry.meal == "Breakfast") {
          $cordovaLocalNotification.cancel(1);
        }
        else if ($scope.entry.meal == "Lunch") {
          $cordovaLocalNotification.cancel(2);
        }
        else if ($scope.entry.meal == "Dinner") {
          $cordovaLocalNotification.cancel(3);
        };

        // Re-schedule the notification
        if ($localstorage.getObject('notifications') == true) {
          var newTime = new Date();
          newTime.setMinutes(newTime.getMinutes() + 2);
          $cordovaLocalNotification.schedule({
              id: 0,
              date: newTime,  
              message: "You haven't recorded anything for a week. Is everything alright?",
              title: "You haven't been recording your meals",
              autoCancel: false
            }).then(function() {
              
            });
        };

        var log = angular.copy($scope.logs);
        log.logsArray[log.logsArray.length - 1].entries.push($scope.entry);

        window.localStorage['logs'] = JSON.stringify(log);

        $scope.logs = JSON.parse(window.localStorage['logs']);
        $state.go('menu.success');
      }      
    };

    // To submit a goal
    $scope.submitGoal = function() {
      var goal = angular.copy($scope.goals);
      setDateSelection($scope.timeIndex);
      if(validateGoalEntry($scope.goalEntry)) {
        $scope.goalEntry.id = goalID();
        goal.push($scope.goalEntry);
        window.localStorage['goals'] = JSON.stringify(goal);
        $scope.goals = JSON.parse(window.localStorage['goals']);
        $state.go('menu.goals');
      }
    };
      

    $scope.updateGoals = function() {
      window.localStorage['goals'] = JSON.stringify($scope.goals);
    };

    $scope.submitEdit = function() {
      if(validateEntry($scope.editEntry)) {
        $scope.logs.logsArray.forEach(function(day) {
          day.entries.forEach(function(entry) {
            if(entry.id == $scope.editWhich) {
              entry = $scope.editEntry;
            }
          });
        });
        window.localStorage['logs'] = JSON.stringify($scope.logs);
        $state.go('menu.logs');
      }
    };

    $scope.submitGoalEdit = function() {
      if(validateGoalEntry($scope.editGoal)) {
        $scope.goals.forEach(function(goal) {
          if(goal.id == $scope.editWhichGoal) {
            goal = $scope.editGoal;
          }
        });
        window.localStorage['goals'] = JSON.stringify($scope.goals);
        $state.go('menu.goals');
      }
    };

}]);
