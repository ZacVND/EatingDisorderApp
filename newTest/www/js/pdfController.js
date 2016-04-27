(function () {
    angular.module('starter').controller('PDFController', ['$scope', 'PDFService', '$localstorage', '$window', '$ionicPopup', PDFController]);

    function PDFController($scope, PDFService, $localstorage, $window, $ionicPopup) {
        var vm = this;

        vm.createReport = function () {
            var logs = $localstorage.getObject('logs');    // Get the Logs object in Local Storage
            console.log(logs.logsArray);    // Checking that logs exist in the console during debugging
            if(logs.logsArray){
                var report = getDummyData($localstorage, $window);  // Get assign data to report variable
                PDFService.createPdf(report);    // Create a PDF file based on the data of report
            }
            else {  // If there is no data or invalid data
                $ionicPopup.alert({
                   title: 'No Data Available',
                   template: 'Please add some entries before creating a Self-Monitoring Sheet'
                });
            }
        };

        return vm;
    }

    function getDummyData($localstorage, $window) {     //  Function to get data from the Logs
        var logs = $localstorage.getObject('logs');    // get object Logs
        var ents = [];  // Data to be returned, in the form of an array
        var k = 0;
        for (i = logs.logsArray.length - 1; i > -1; i--) {
            console.log(logs.logsArray[i].entries);
            if (ents.length < 50) {
                Array.prototype.push.apply(ents,logs.logsArray[i].entries);     // Appending the entries to the ents array
                for (var j = 0; j < logs.logsArray[i].entries.length; j++) {    // This loop is to append the date into each entry
                    ents[k].date = logs.logsArray[i].date;
                    k++;
                };
            }
            else {
                break;           
            }
        };
        console.log(ents);
        return {
            Date: new Date().toLocaleDateString("en-IE", { year: "numeric", month: "long", day: "numeric" }),   // Get the current date
            Items: ents
        };
    }
})();