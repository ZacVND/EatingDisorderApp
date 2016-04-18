angular.module('starter.services',[])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);

// .factory('PDFService',['$q', PDFService])

// function PDFService($q) {
//     function createPdf(invoice) {
//         return $q(function (resolve, reject) {
//             var dd = createDocumentDefinition(invoice);
//             var pdf = pdfMake.createPdf(dd);

//             pdf.getBase64(function (output) {
//                 resolve(base64ToUint8Array(output));
//             });
//         });
//     }

//     return {
//         createPdf: createPdf
//     };
// }

// function createDocumentDefinition(invoice) {

//     var items = invoice.Items.map(function (item) {
//         return [item.Time, item.Food, item.Loca, item.Binge, item.Purge, item.Thoughts];
//     });

//     var dd = {
//         content: [
//             { text: 'My Self-monitoring Sheet', style: 'header' },
//             { text: [
//                 'Date: ', 
//                 {text:  invoice.Date,}
//                 ], alignment: 'center', style: 'subheader' },
//             {
//                 style: 'itemsTable',
//                 table: {
//                     widths: [40,'*',50, 40, 40,'*'],
//                     body: [
//                         [
//                             { text: 'Time', style: 'itemsTableHeader' },
//                             { text: 'Food and Drink', style: 'itemsTableHeader' },
//                             { text: 'Location', style: 'itemsTableHeader' },
//                             { text: 'Binge', style: 'itemsTableHeader' },
//                             { text: 'Purge', style: 'itemsTableHeader' },
//                             { text: 'Thoughts', style: 'itemsTableHeader' },
//                         ]
//                     ].concat(items)
//                 }
//             },
//         ],
//         styles: {
//             header: {
//                 fontSize: 20,
//                 bold: true,
//                 margin: [0, 0, 0, 0],
//                 alignment: 'center'
//             },
//             subheader: {
//                 fontSize: 14,
//                 bold: true,
//                 margin: [0, 5, 0, 10]
//             },
//             itemsTable: {
//                 margin: [0, 5, 0, 15]
//             },
//             itemsTableHeader: {
//                 bold: true,
//                 fontSize: 13,
//                 color: 'black'
//             },
//         },
//         defaultStyle: {
//         }
//     }

//     return dd;
// }

// function base64ToUint8Array(base64) {
//     var raw = atob(base64);
//     var uint8Array = new Uint8Array(raw.length);
//     for (var i = 0; i < raw.length; i++) {
//         uint8Array[i] = raw.charCodeAt(i);
//     }
//     return uint8Array;
// }