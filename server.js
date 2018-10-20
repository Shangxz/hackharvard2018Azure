// // call the packages we need
// var express = require('express'); // call express
// var request = require("request");

// var app = express(); // define our app using express

// var port = process.env.PORT || 8080;

// app.get('/keyText', function (req, res) {
//     // console.log(req);
//     // console.log(res);
//     // console.log(req.query.text);

//     var options = {
//         method: 'POST',
//         url: 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases',
//         headers:
//         {
//             'postman-token': 'c5c887d3-932f-4905-5933-6585bd3781ab',
//             'cache-control': 'no-cache',
//             'ocp-apim-subscription-key': 'dd2e13dafe9b4cd79a739e485c6f8a1e',
//             'content-type': 'application/json'
//         },
//         body:
//         {
//             documents:
//                 [{
//                     language: 'en',
//                     id: '1',
//                     text: req.query.text
//                 }]
//         },
//         json: true
//     };

//     request(options, function (error, response, body) {
//         if (error) throw new Error(error);
//         res.json(body.documents[0].keyPhrases);
//         console.log(body.documents[0].keyPhrases);
//     });
// });

// app.listen(port);

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var http = require('http');
var request = require("request");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());

var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router
var SpeechToText = express.Router();



// // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.post('/', function (req, res) {

    // console.log(req);
    // console.log(res);
    // console.log(req.query.text);

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
                    text: req.query.text
                }]
        },
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.json(body.documents[0].keyPhrases);
        console.log(body.documents[0].keyPhrases);
    });

});


app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);