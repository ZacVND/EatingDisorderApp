(function () {
    angular.module('starter').controller('PDFController', ['$scope', '$ionicModal', 'PDFService', '$localstorage', '$window', PDFController]);

    function PDFController($scope, $ionicModal, PDFService, $localstorage, $window) {
        var vm = this;

        setDefaultsForPdfViewer($scope);

        // Initialize the modal view.
        $ionicModal.fromTemplateUrl('pdf-viewer.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            vm.modal = modal;
        });

        vm.createReport = function () {
            var report = getDummyData($localstorage, $window);
            console.log(report);

            PDFService.createPdf(report)
                .then(function (pdf) {
                    var blob = new Blob([pdf], { type: 'application/pdf' });
                    $scope.pdfUrl = URL.createObjectURL(blob);
                    // Display the modal view
                    vm.modal.show();
                });
        };

        // Clean up the modal view.
        $scope.$on('$destroy', function () {
            vm.modal.remove();
        });

        return vm;
    }

    function setDefaultsForPdfViewer($scope) {
        $scope.scroll = 0;
        $scope.loading = 'loading';

        $scope.onError = function (error) {
            console.error(error);
        };

        $scope.onLoad = function () {
            $scope.loading = '';
        };

        $scope.onProgress = function (progress) {
            console.log(progress);
        };
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