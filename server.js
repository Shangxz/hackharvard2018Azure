// call the packages we need
var express = require('express'); // call express
var request = require("request");

var app = express(); // define our app using express

app.get('/keyText', function (req, res) {
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

app.listen(process.env.PORT || 80);