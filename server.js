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

// // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {

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

        var qStr = "";
        if (body.documents[0] == undefined) {
            qStr = req.query.text;
        }
        else {
            // res.json(body.documents[0].keyPhrases);
            qStr = body.documents[0].keyPhrases.join();
        }

        console.log(qStr);

        var optionsImg = {
            method: 'GET',
            url: 'https://api.cognitive.microsoft.com/bing/v7.0/images/search?',
            qs: {
                q: qStr
            },
            headers: {
                'postman-token': '37f2fd13-4353-8101-15c7-8db4ad48f35f',
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                'ocp-apim-subscription-key': '4f5a247648e449679e1ac58c04386def'
            }
        };

        request(optionsImg, function (error, response, body) {
            if (error) throw new Error(error);
            bodyJson = JSON.parse(body);

            var imgList = [];
            for (var i = 0; i < 35; i++) {
                if (bodyJson != 'undefined') {
                    imgList.push(bodyJson.value[i].contentUrl);
                }
            }
            var randomPic = imgList[Math.floor(Math.random() * imgList.length)];

            var faceOptions = {
                method: 'POST',
                url: 'https://eastus.api.cognitive.microsoft.com/face/v1.0/detect',
                qs: {
                    returnFaceId: 'false',
                    returnFaceLandmarks: 'false'
                },
                headers: {
                    'postman-token': 'dd6392b8-5411-6347-c8c3-927a10856dbb',
                    'cache-control': 'no-cache',
                    'content-type': 'application/json',
                    'ocp-apim-subscription-key': '1e5136e00d7141cbb3bdf4623ada66bc'
                },
                body: {
                    url: randomPic
                },
                json: true
            };

            var returnList = [qStr, randomPic];

            request(faceOptions, function (error, response, body) {
                if (error) throw new Error(error);
                console.log(body);
                if (body.length != []) {
                    returnList.push(body[0].faceRectangle.top);
                    returnList.push(body[0].faceRectangle.top + body[0].faceRectangle.height);
                    returnList.push(body[0].faceRectangle.left);
                    returnList.push(body[0].faceRectangle.left + body[0].faceRectangle.width);
                }
                console.log(returnList);
                res.json(returnList);
            });
        });
    });
});

app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);