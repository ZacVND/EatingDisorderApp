(function () {angular.module('starter').factory('PDFService', ['$q', '$cordovaFile', '$ionicPlatform', '$ionicPopup', PDFService]);

function PDFService($q,$cordovaFile,$ionicPlatform,$ionicPopup) {
    function createPdf(report) {
        return $q(function (resolve, reject) {
            var dd = createDocumentDefinition(report);
            console.log(dd);
            var pdf = pdfMake.createPdf(dd).getBuffer(function (buffer) {
                var utf8 = new Uint8Array(buffer); // Convert to UTF-8... 
                binaryArray = utf8.buffer; // Convert to Binary...

                var pathFile = "";
                if (ionic.Platform.isIOS()) {
                    var pathFile = cordova.file.documentsDirectory
                } else {
                    var pathFile = cordova.file.externalDataDirectory
                }

                $cordovaFile.writeFile(pathFile, "report.pdf", binaryArray, true)
                .then(function (success) {
                    console.log("pdf created");
                    $ionicPopup.alert({
                       title: 'Self-monitoring Sheet Created',
                       template: 'A Self-monitoring Sheet containing your last 50 meals has been created'
                    });
                }, function (error) {
                    alert("Nothing");
                     console.log("error");
                });
            });

            pdf.getBase64(function (output) {
                resolve(base64ToUint8Array(output));
            });
        });
    }

    return {
        createPdf: createPdf
    };
}

function createDocumentDefinition(report) {

    var items = report.Items.map(function (item) {
        return [item.date, item.time, item.food, item.location, item.binge, item.purge, item.thoughts];
    });

    var dd = {
        content: [
            { text: 'My Self-monitoring Sheet', style: 'header' },
            { text: [
                'Date: ', 
                {text:  report.Date,}
                ], alignment: 'center', style: 'subheader' },
            {
                style: 'itemsTable',
                table: {
                    widths: [45, 20,'*',50, 22, 22,'*'],
                    body: [
                        [
                            { text: 'Date', style: 'itemsTableHeader' },
                            { text: 'Time', style: 'itemsTableHeader' },
                            { text: 'Food and Drink', style: 'itemsTableHeader' },
                            { text: 'Location', style: 'itemsTableHeader' },
                            { text: 'Binge', style: 'itemsTableHeader' },
                            { text: 'Purge', style: 'itemsTableHeader' },
                            { text: 'Thoughts', style: 'itemsTableHeader' },
                        ]
                    ].concat(items)
                }
            },
        ],
        styles: {
            header: {
                fontSize: 20,
                bold: true,
                margin: [0, 0, 0, 0],
                alignment: 'center'
            },
            subheader: {
                fontSize: 16,
                bold: true,
                margin: [0, 5, 0, 10]
            },
            itemsTable: {
                margin: [0, 5, 0, 15]
            },
            itemsTableHeader: {
                bold: true,
                fontSize: 9,
                color: 'black'
            },
        },
        defaultStyle: {
            fontSize: 8
        }
    }

    return dd;
}

function base64ToUint8Array(base64) {
    var raw = atob(base64);
    var uint8Array = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) {
        uint8Array[i] = raw.charCodeAt(i);
    }
    return uint8Array;
}
})();