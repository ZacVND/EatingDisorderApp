(function () {
    angular.module('starter').controller('PDFController', ['$scope', 'PDFService', '$localstorage', '$window', '$ionicPopup', PDFController]);

    function PDFController($scope, PDFService, $localstorage, $window, $ionicPopup) {
        var vm = this;

        vm.createReport = function () {
            var logs = $localstorage.getObject('logs');
            console.log(logs.logsArray);
            if(logs.logsArray){
                var report = getDummyData($localstorage, $window);
                PDFService.createPdf(report);    
            }
            else {
                $ionicPopup.alert({
                   title: 'No Data Available',
                   template: 'Please add some entries before creating a Self-Monitoring Sheet'
                });
            }
        };

        return vm;
    }

    function getDummyData($localstorage, $window) {
        var logs = $localstorage.getObject('logs');
        var ents = [];
        var k = 0;
        for (i = logs.logsArray.length - 1; i > -1; i--) {
            console.log(logs.logsArray[i].entries);
            if (ents.length < 50) {
                Array.prototype.push.apply(ents,logs.logsArray[i].entries);
                for (var j = 0; j < logs.logsArray[i].entries.length; j++) {
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
            Date: new Date().toLocaleDateString("en-IE", { year: "numeric", month: "long", day: "numeric" }),
            Items: ents
        };
    }
})();