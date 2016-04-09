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

    // $http.get('js/data.json').success(function(data) {
    //   console.log($scope.logs);
    //   $scope.logs = data.logs;
    //   console.log($scope.logs);
      
    //   var d = new moment();
    //   if(JSON.stringify($scope.logs).indexOf(d.format('YYYY/MM/DD')) == -1) {
    //     $scope.logs.push({date:d.format('YYYY/MM/DD'),entries:[]});
    //   }
    //   data.logs = JSON.stringify($scope.logs);
    // });

    $http.get('js/cuteanimals.json').success(function(data) {
      $scope.animals = data.photos.photo;
      $scope.photo = $scope.animals[Math.floor(Math.random()*$scope.animals.length)];
    });

    $scope.logs = [   
      {
        "date":"2016/02/25",
        "entries":[
          {
            "id":"250216b",
            "time":"08:42",
            "meal":"Breakfast",
            "food":"Pancakes with butter",
            "thoughts":"Upset I had a big breakfast",
            "location":"Home",
            "people":"Parents"
          },
          {
            "id":"250216a",
            "time":"17:39",
            "meal":"Afternoon Snack",
            "food":"6 sausage rolls",
            "thoughts":"Feel like a pig for having so many sausage rolls",
            "location":"Outside",
            "people":"Alone",
            "binge":"true"
          }
        ]
      },
      {
        "date":"2016/02/27",
        "entries":[
          {
            "id":"270216b",
            "time":"09:15",
            "meal":"Breakfast",
            "food":"Toast, jam, milk",
            "thoughts":"So tired",
            "location":"Home","people":"Alone"
          },
          {
            "id":"270216d",
            "time":"17:39",
            "meal":"Dinner",
            "food":"Pizza and chips",
            "thoughts":"Feel so bad",
            "location":"Friend's House",
            "people":"Friends",
            "purge":"true"
          }
        ]
      },
      {
        "date":"2016/02/28",
        "entries":[
          {
            "id":"280216b",
            "time":"07:06",
            "meal":"Breakfast",
            "food":"Cereal, milk, orange juice",
            "thoughts":"Feeling quite nervous",
            "location":"Home",
            "people":"Alone"
          },
          {
            "id":"280216l",
            "time":"13:25",
            "meal":"Lunch",
            "food":"Ham sandwich, crisps, apple",
            "location":"Home",
            "people":"Alone"
          },
          {
            "id":"280216d",
            "time":"19:02",
            "meal":"Dinner",
            "food":"Pasta and pesto",
            "thoughts":"Proud of myself for eating 3 meals today",
            "location":"Restaurant, cafe"
          },
          {
            "id":"280216a",
            "time":"15:59",
            "meal":"Afternoon Snack",
            "food":"Packet of crisps"
          }
        ]
      },
      {
        "date":"2016/03/24",
        "entries":[
          {
            "id":"240316b",
            "time":"07:06",
            "meal":"Breakfast",
            "food":"Cereal, milk, orange juice",
            "thoughts":"Feeling quite nervous",
            "location":"Home",
            "people":"Alone"
          },
          {
            "id":"240316l",
            "time":"13:25",
            "meal":"Lunch",
            "food":"Ham sandwich, crisps, apple",
            "location":"School, college, uni",
            "people":"Friends"
          },
          {
            "id":"240316d",
            "time":"19:02",
            "meal":"Dinner",
            "food":"Pasta and pesto",
            "thoughts":"Proud of myself for eating 3 meals today",
            "location":"Home",
            "people":"Parents"
          },
          {
            "id":"240316t1",
            "time":"16:42",
            "thoughts":"Feeling quite good today"
          }
        ]
      }
    ]

    var d = new moment();
    if(JSON.stringify($scope.logs).indexOf(d.format('YYYY/MM/DD')) == -1) {
      $scope.logs.push({date:d.format('YYYY/MM/DD'),entries:[]});
    }
    // data.logs = JSON.stringify($scope.logs);


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
      console.log("dayIndex: " + dayIndex);
      $scope.logs[$scope.logs.length - dayIndex - 1].entries.splice($scope.logs[$scope.logs.length - dayIndex - 1].entries.indexOf(item), 1);
    };

    $scope.onItemDeleteDetailed = function(dayIndex, item) {
      console.log("dayIndex: " + dayIndex);
      $scope.logs[dayIndex].entries.splice($scope.logs[dayIndex].entries.indexOf(item), 1);
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

      console.log($scope.timePickerValue.value);
      console.log("meal: " + $scope.entry.meal);
      console.log("time: " + $scope.entry.time);
      console.log("food and drink: " + $scope.entry.food);
      console.log("binge: " + $scope.entry.binge);
      console.log("location: " + $scope.entry.location);
      console.log("people: " + $scope.entry.people);
      console.log("purge: " + $scope.entry.purge);
      console.log("thoughts: " + $scope.entry.thoughts);

      createdID($scope.entry.meal);
      console.log("id: " + $scope.entry.id);

      $scope.logs[$scope.logs.length - 1].entries.push($scope.entry);

      console.log($scope.logs);
    };
}]);