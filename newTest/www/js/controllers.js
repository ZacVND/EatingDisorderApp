angular.module('starter.controllers', ['ngCordova'])

//Controller for the side menu
.controller('mainCtrl', function($scope, $ionicSideMenuDelegate) { 
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();  // Toggle the side menu
  }

  // These are the items which populate the menu
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
  // Controller for the Intro page

  if(window.localStorage['seenIntro'] === "true") { 
  // Create a variable in local storage to keep track of whether or not the user has seen the intro page
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

.controller('SettingsCtrl', ['$scope','$state','$localstorage', '$cordovaFile', '$cordovaEmailComposer', 
  function($scope, $state, $localstorage, $cordovaFile, $cordovaEmailComposer) {
    // Controller for the Settings Page

  $scope.clinician = JSON.parse(window.localStorage['clinician'] || '{}');  // Create an object called clinician
  $scope.edit = function() {
    $state.go('menu.settingsEdit'); // go to the page to edit clinician details
  };
  var logs = $localstorage.getObject('logs');
  $scope.submit = function(clinician) {
    $localstorage.setObject('clinician', $scope.clinician);
    $state.go('menu.settings');
  };

  $scope.sendEmail = function() { // Email function
        console.log("email function executed");
        var bodyText = "<h4>Hi, this is my Self-monitoring sheet of the last 50 meals</h4>"; // Pre filled email body
        var attach; // variable to hold path to attachment file
        var pathFile = ''; // variable to hold the directory path

        // This code is to determine the directory path based on OS
        if(ionic.Platform.isIOS()) {
          pathFile = cordova.file.documentsDirectory;
        }
        else {
          pathFile = cordova.file.externalRootDirectory;
        }

        // Check if file exists
        $cordovaFile.checkFile(pathFile, "report.pdf")
         .then(function (success) {
          // If yes, attach file
            attach = ['' + pathFile.replace('file://','') + "report.pdf"];
          }, function (error) {
          // If not attach nothing
            attach = [];
          });

        $cordovaEmailComposer.isAvailable().then(function() {
           // is available
           var toC = $localstorage.getObject('clinician');  // get clinician email
            var email = {
              to: toC.email,  // to: clinician email
              attachments: attach,  // attachment: path to PDF file
              subject: 'My Self Monitoring Sheet',  // subject of email
              body: bodyText, // body of email
              isHtml: true // Body can be markup with HTML
            };

          $cordovaEmailComposer.open(email).then(null, function () {
             // user cancelled email
          });
         }, function () {
           // not available
         });
    };  
}])

// Controller for the success page which is shown after submitting an entry
.controller('successCtrl', ['$scope', '$http', '$localstorage', 
  function($scope, $http, $localstorage) {
  // Function to load the quotes from the JSON file
  $http.get('js/quotes.json').success(function(data) {
    $scope.quotes = data.quotesArray; // Assigns the array from the JSON file to $scope.quotes
    $scope.quote = $scope.quotes[Math.floor(Math.random()*$scope.quotes.length)]; // Selects a random quote from the array. This is the quote that will be dsplayed
  });

  $scope.savedQuotes = JSON.parse(window.localStorage['savedQuotes'] || '{"array":[]}'); // Assigns the saved quotes to $scope.savedQuotes

  // Function to save a quote an update localStorage
  $scope.saveQuote = function(quoteToSave) {
    if(JSON.stringify($scope.savedQuotes).indexOf(quoteToSave) == -1) { // Ensures that the quote hasn't already been saved to prevent duplicates
      $scope.savedQuotes.array.push(quoteToSave);
      $localstorage.setObject('savedQuotes', $scope.savedQuotes); // Update localStorage
      $ionicAnalytics.track('Quote saved', {
      }); // Track the event for analytics
    }
  };

  // Function to delete a quote
  $scope.deleteQuote = function(index) {
    $scope.savedQuotes.array.splice(index, 1);
    $localstorage.setObject('savedQuotes', $scope.savedQuotes); // Update localStorage
  };
}])


// This is the controller which handles logs and goals
.controller('logsCtrl', ['$scope', '$ionicPopup', '$http', '$state', '$cordovaLocalNotification', '$localstorage', '$ionicAnalytics',
 function($scope, $ionicPopup, $http, $state, $cordovaLocalNotification, $localstorage, $ionicAnalytics) {

    $scope.whichEntry = $state.params.aId; // ID used for changing state to detailed view

    $scope.editWhich = $state.params.bId;  // ID used for changing state to edit an entry

    $scope.editWhichGoal = $state.params.cId; // ID used for changing state to edit a goal

    // Function to change state to the goals_input page
    $scope.goalIn = function() {
      $state.go('menu.goals_input')
    }

    // Load logs from local storage
    $scope.logs = JSON.parse(window.localStorage['logs'] || '{"logsArray":[]}');

    // Function which assigns the entry corresponding to the given ID to $scope.editEntry
    var getEntryByID = function(id) {
       $scope.logs.logsArray.forEach(function(day) {
        day.entries.forEach(function(entry) {
          if(entry.id == id) {
            $scope.editEntry = entry;
          }
        });
      });
    }

    // Used to call the above function
    getEntryByID($scope.editWhich);

    // If there isn't already an object for this day in the array, created one and push it to logs
    var d = new moment();
    if(JSON.stringify($scope.logs).indexOf(d.format('YYYY/MM/DD')) == -1) {
      $scope.logs.logsArray.push({date:d.format('YYYY/MM/DD'),entries:[]});
    };

    // To change state to the Add Entry page when the user presses the + icon on the logs page
    $scope.logsPageAddLog = function() {
      $state.go('menu.input');
    }

    // Change page to edit an entry
    $scope.changePageToEdit = function(id) {
      document.location.href = "#/menu/input/" + id;
    };

    // Change page to edit a goal
    $scope.changePageToEditGoal = function(id) {
      document.location.href = "#/menu/goals_input/" + id;
    };

    // Load goals from localStorage
    $scope.goals = JSON.parse(window.localStorage['goals'] || '[]');

    // Assigns the goal corresponsing to the ID to $scope.editGoal
    var getGoalByID = function(id) {
      $scope.goals.forEach(function(goal) {
        if(goal.id == id) {
          $scope.editGoal = goal;
        }
      });
    };

    // Calls the above function
    getGoalByID($scope.editWhichGoal);

    // Create variable to hold the value of the notifications toggle in the Settings page.
    $scope.notifications = JSON.parse(window.localStorage['notifications'] || 'false');

    //This is the function which schedules all of the notifications
    $scope.notificationsChanged = function() {
      console.log($scope.notifications);
      // Change the value of notifications variable
      $localstorage.setObject('notifications', $scope.notifications);
        // When notifications toggle is on, schedule all notifications
        if ($localstorage.getObject('notifications') == true) {
          var weekTime = new Date();
          weekTime.setDate(weekTime.getDate() + 7);
          $cordovaLocalNotification.schedule({  // 1 week inactivity notification
            id: 0,
            date: weekTime,  
            message: "You haven't recorded anything for a week. Is everything alright?",
            title: "You haven't been recording your meals",
            autoCancel: false
          }).then(function() {
            
          });
          var noon = new Date().setHours(11);   // These notification will go off
          var afternoon = new Date().setHours(16);  // If it's already past meal time
          var night = new Date().setHours(22);  // And the user hasn't entered the respective meal.
          $cordovaLocalNotification.schedule([{ // Notification for every meal
              id: 3,
              message: "Time to record your Dinner log",
              firstAt: night,
              every: "day", // Reschedule everyday
              autoCancel: false
            },{
              id: 2,
              message: "Time to record your Lunch log",
              firstAt: afternoon,
              every: "day",
              autoCancel: false
            },{
              id: 1,
              message: "Time to record your Breakfast log",
              firstAt: noon,
              every: "day",
              autoCancel: false
          }]);
      }
      else {  // Cancel all notifications if value of "notification" variable is false
        $cordovaLocalNotification.cancelAll();
      }
    }

    // Checks if there are any goals that have been recorded for today
    // This is done to determine whether or not placeholder text needs to be shown on the home page
    $scope.todayHasGoals = function() {
      var d = new moment().format('YYYY/MM/DD');
      if(JSON.stringify($scope.goals).indexOf(d) == - 1) {
        return false;
      } else {
        return true;
      }
    };

    // Checks if there are any upcoming goals that have been recorded
    // This is done to determine whether or not placeholder text needs to be shown in the upcoming goals section of the goals page
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

    // Checks if there are any past goals that have been recorded
    // This is done to determine whether or not placeholder text needs to be shown in the past goals section of the goals page
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

    // Function to return today's date in the format YYYY/MM/DD
    $scope.todaysDate = function(separator) {
      var d = new moment();
      return d.format('YYYY' + separator + 'MM' + separator + 'DD');
    };

    // Used to convert the output from the datepicker into a usable format for filtering
    $scope.dateFilter = function(date) {
      date = String(date);
      if(date == "undefined" || date == "null")
      {
        return "";
      }
      var d = new moment(date);

      return d.format('YYYY/MM/DD');
    };

    // Returns the date in a more human readable format for the logs page
    $scope.getDisplayDate = function(date) {
      var res = date.split("/");
      var str = res[0] + " " + res[1] + " " + res[2];
      var d = new moment(str, "YYYY MM DD");

      if(d.year() != moment().year()) {
        return d.format('dddd Do MMMM YYYY');
      }
      return d.format('dddd Do MMMM');
    };

    // Returns how long ago a certain date was for the logs page
    $scope.getTimeAgo = function(date) {
      var d = moment($scope.todaysDate('-'));
      return moment(date, "YYYY/MM/DD").from(d);
    };

    // Deletes an entry from the logs page
    $scope.onItemDelete = function(dayIndex, item) {
      var index = ($scope.logs.logsArray.length - dayIndex - 1);
      $scope.logs.logsArray[index].entries.splice($scope.logs.logsArray[index].entries.indexOf(item), 1);
      window.localStorage['logs'] = JSON.stringify($scope.logs); // Updates local storage
    };

    // Deletes an entry from the detailed logs page
    $scope.onItemDeleteDetailed = function(dayIndex, item) {
      $scope.logs.logsArray[dayIndex].entries.splice($scope.logs.logsArray[dayIndex].entries.indexOf(item), 1);
      window.localStorage['logs'] = JSON.stringify($scope.logs); // Updates local storage
    };

    // Deletes a goal
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

    // Used to keep track of which button in a 3 button block is active
    $scope.activeButton = 0;
    $scope.setActiveButton = function(index) {
      $scope.activeButton = index;
    };

    // Keeps track of if the user has selected "Other" when entering a time or date
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

    // Sets the default selected item for time/date to be the first in the 3 button block
    $scope.timeIndex = 0;

    // Updates time index
    $scope.setTimeIndex = function(index) {
      $scope.timeIndex = index;
    };

    // Initialise the time picker
    $scope.timePickerValue = {
      value: new Date(1970, 0, 1, 0, 0, 0)
    };

    $scope.locations = ["Home","School, college, uni","Work","Friend's House","Restaurant, cafe, etc.","Other"];

    $scope.people = ["Alone","Parents","Friends","Other"];

    // The values for an entry before anything is added
    $scope.entry = {
      binge: false,
      purge: false,
      thoughts: "",
      food: "",
      location: "",
      people: "",
      meal: ""
    };

    // Used for populating the goals input page
    $scope.goalDates = ["Today", "Tomorrow", "Other"];

    $scope.goalEntry = {
      completed: false
    };

    // To convert time selection into a real time
    var setTimeSelection = function(index) {
      var b = new moment(); 
      switch(index) {
        case 0: // Subtract 10 minutes from the current time
          b = b.subtract(10, 'minutes').format('HH:mm');
          $scope.entry.time = b;
          break;
        case 1: // Subtract 30 minutes from the current time
          b = b.subtract(30, 'minutes').format('HH:mm');
          $scope.entry.time = b;
          break;
        case 2: // Use the current time selected by the time picker
          var x = document.getElementById("timePicker").value;
          $scope.entry.time = x;
          break;
      }
    };

    // Convert the date selection into a real date
    var setDateSelection = function(index) {
      var b = new moment(); 
      switch(index) {
        case 0: // Today's date
          b = b.format('YYYY/MM/DD');
          $scope.goalEntry.date = b;
          break;
        case 1: // Tomorrow's date
          b = b.add(1, 'days').format('YYYY/MM/DD');
          $scope.goalEntry.date = b;
          break;
        case 2: // Use the date from the date picker
          var x = document.getElementById("goalDate").value;
          $scope.goalEntry.date = new moment(x).format('YYYY/MM/DD');
          break;
      }
    };

    // Create ID for an entry
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

    // Create ID for goal entry
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

    // Perform validation checks for submitting an entry
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

      // Nothing entered
      if(!entry.meal && !entry.food && !entry.thoughts & !entry.purge) {
        var alertPopup = $ionicPopup.alert({
          title: 'Not so fast!',
          template: 'You must add something before you can submit'
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
        if((logsEntry.meal == entry.meal) && entry.meal) {
          if(entry.id != logsEntry.id) { // This is to prevent the entry from being invalid when editing an entry
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

    // Perform validation checks for adding a goal entry
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
      if(indexedTime) { // If time has been selected
        setTimeSelection($scope.timeIndex); // Fetch the appropriate value for time
      } else {
        $scope.entry.time = moment().format('HH:mm'); // Otherwise, use the current time
      }

      if(purge) { // If the post was just a purge entry
        $scope.entry.purge = true; // Automatically set purge to be true
      }

      var valid = validateEntry($scope.entry); // Perform validation checks

      if(valid) { // Only submit if valid
        $scope.entry.id = createdID(); // Create ID
        
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
          var newWeekTime = new Date();
          newWeekTime.setDate(newWeekTime.getDate() + 7);
          $cordovaLocalNotification.schedule({
              id: 0,
              date: newWeekTime,  
              message: "You haven't recorded anything for a week. Is everything alright?",
              title: "You haven't been recording your meals",
              autoCancel: false
            }).then(function() {
              
            });
        };

        var log = angular.copy($scope.logs);
        log.logsArray[log.logsArray.length - 1].entries.push($scope.entry);

        window.localStorage['logs'] = JSON.stringify(log); //Update localStorage

        // Track the event for analytics
        $ionicAnalytics.track('Entry added', {
          meal: $scope.entry.meal
        });

        $scope.logs = JSON.parse(window.localStorage['logs']);
        $state.go('menu.success'); // go to the success screen
      }      
    };

    // To submit a goal
    $scope.submitGoal = function() {
      var goal = angular.copy($scope.goals);
      setDateSelection($scope.timeIndex); // fetch the appropriate date
      if(validateGoalEntry($scope.goalEntry)) { // Ensure that the post is valid
        $scope.goalEntry.id = goalID();
        goal.push($scope.goalEntry);
        window.localStorage['goals'] = JSON.stringify(goal); // Update localStorage

        // Track the event for analytics
        $ionicAnalytics.track('Goal added', {
        });

        $scope.goals = JSON.parse(window.localStorage['goals']);
        $state.go('menu.goals'); // go back to the goals page
      }
    };
    
    // Updates a goal whenever the user selects if it was completed or not
    $scope.updateGoals = function() {
      window.localStorage['goals'] = JSON.stringify($scope.goals);
    };

    // Submits an edited entry
    $scope.submitEdit = function() {
      if(validateEntry($scope.editEntry)) {
        $scope.logs.logsArray.forEach(function(day) {
          day.entries.forEach(function(entry) {
            if(entry.id == $scope.editWhich) {
              entry = $scope.editEntry;
            }
          });
        });

        // Track event for analytics
        $ionicAnalytics.track('Entry edited', {
        });

        window.localStorage['logs'] = JSON.stringify($scope.logs); // update localStorage
        $state.go('menu.logs'); // go back to the logs page
      }
    };

    // Submits an edited goal entry
    $scope.submitGoalEdit = function() {
      if(validateGoalEntry($scope.editGoal)) {
        $scope.goals.forEach(function(goal) {
          if(goal.id == $scope.editWhichGoal) {
            goal = $scope.editGoal;
          }
        });
        window.localStorage['goals'] = JSON.stringify($scope.goals); // update localStorage
        $state.go('menu.goals'); // go back to the goals page
      }
    };

}]);
