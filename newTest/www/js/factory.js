angular.module('starter.services',[])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;    // set value to the key (variable)
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;   // get value based on key
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);  // set an object to the key
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}'); // get object based on key
    }
  }
}]);