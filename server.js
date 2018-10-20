// call the packages we need
var express = require('express'); // call express

var http = require('http');
var request = require("request");
var azure = require('azure-storage');
var multiparty = require('multiparty');
var formidable = require("formidable");
var multer = require('multer')
var MulterAzureStorage = require('multer-azure-storage')

var app = express(); // define our app using express

var port = process.env.PORT || 8080; // set our port

// var upload = multer({
//     storage: new MulterAzureStorage({
//         azureStorageConnectionString: 'DefaultEndpointsProtocol=https;AccountName=cynosure;AccountKey=xxxxxxxxxxxxxxxxxxxxxxxxxx+yA==;EndpointSuffix=core.windows.net',
//         azureStorageAccessKey: 'xxxxxxxxxxxxxxxxxx',
//         azureStorageAccount: 'cynosure',
//         containerName: 'cynosure',
//         containerSecurity: 'blob'
//     }),
//     onError : function(err, next) {
//         console.log('error', err);
//         next(err);
//       }
// });
// app.post('/', upload.any(), function(req, res) {
//     // // get uploaded template file
//     const payload = req.files;
//     // Detect if file was sent
//     if (undefined === payload) {
//         res.status(400).json({ok:false, err:'No file uploaded'});
//     }
//     console.log(payload);
//     console.log(payload[0].url);
//     res.send(payload[0].url);
// });

app.get('/', function (req, res) {
    console.log(req);
    console.log(res);

    var options = {
        method: 'POST',
        url: 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases',
        headers:
        {
            'postman-token': 'c5c887d3-932f-4905-5933-6585bd3781ab',
            'cache-control': 'no-cache',
            'ocp-apim-subscription-key': 'dd2e13dafe9b4cd79a739e485c6f8a1e',
            'content-type': 'application/json'
        },
        body:
        {
            documents:
                [{
                    language: 'en',
                    id: '1',
                    text: 'Hello world. This is some input text that I love.'
                }]
        },
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });
});

app.listen(port);