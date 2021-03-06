var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var PORT = process.env.PORT || 8080;
var APP_HOME = process.env.APP_HOME || './';

var beallsRouter = require('./routes/beallsRouter');
app.use('/bealls', beallsRouter);

var bestBuyRouter = require('./routes/bestBuyRouter');
app.use('/bestbuy', bestBuyRouter);

var decoderRouter = require('./routes/decoderRouter');
app.use('/decoder', decoderRouter);

var instructionalRouter = require('./routes/instructionalRouter');
app.use('/instructional', instructionalRouter);

var messagingRouter = require('./routes/messagingRouter');
app.use('/messaging', messagingRouter);

var universalRouter = require('./routes/universalParksRouter.js');
app.use('/universal', universalRouter);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/', function (req, res) {
    //res.send('Hello World!');
    var html = fs.readFileSync(APP_HOME + '/home.html').toString();
    res.send(html);
});

// For easy browser testing...
app.get('/platforms/:platformId/domains/:domainId/accounts/:accountId', function (req, res) {

    console.log(req.body);

    var platformId = req.params.platformId;
    var domainId = req.params.domainId;
    var accountId = req.params.accountId;
    var clientRequestId = req.query.clientRequestId;

    var response = {
        "platformId": platformId,
        "domainId": domainId,
        "owner": "W Brian Leonard",
        "status": "Active",
        "activationDate": "November 11, 2001",
        "accountId": accountId,
        "clientRequestId": clientRequestId
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(response);

})

app.post('/platforms/:platformId/domains/:domainId/accounts/:accountId', function (req, res) {

    console.log(req.body);

    var platformId = req.params.platformId;
    var domainId = req.params.domainId;
    var accountId = req.params.accountId;
    var clientRequestId = req.query.clientRequestId;

    var response = {
        "platformId": platformId,
        "domainId": domainId,
        "owner": "W Brian Leonard",
        "status": "Active",
        "activationDate": "November 11, 2001",
        "accountId": accountId,
        "clientRequestId": clientRequestId
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(response);

})

app.listen(PORT, function () {

    //codeTest();
    console.log('Node API Container listening on port ' + PORT + '!');
})

function codeTest() {

    var url = require('url');
    var REQUEST_URL = "http://www.oracle.com/test?subjectx=astronomy"

    var url_parts = url.parse(REQUEST_URL, true);
    var query = url_parts.query;
    var subject = ((typeof query.subject !== 'undefined') ? query.subject : "");
    var relax = ((typeof query.relax !== 'undefined') ? query.relax : "false");

    console.log("REQUEST_URL = " + REQUEST_URL);
    console.log(url_parts);
    console.log("subject: " + subject);
    console.log("relax: " + relax);

    if (subject.toLowerCase() === 'astronomy' || relax === "true") {

        var response =
                {
                    "recordsFound": 3,
                    "searchTerm": subject,
                    "relaxed": relax,
                    "results": [
                        {
                            "title": "The Cosmic Perspective, 2nd edition",
                            "authors": [
                                "Bennett",
                                "Donahue",
                                "Schneider",
                                "Voit"
                            ],
                            "publisher": "Innovation Education",
                            "cover_image": "http://www.webassign.net/bdsvastro/BDSVastr02_cover_sm.jpg"
                        },
                        {
                            "title": "Astronomy Today, 8th edition",
                            "authors": [
                                "Chaisson ",
                                "McMillan"
                            ],
                            "publisher": "Pearson Education",
                            "cover_image": "http://www.webassign.net/chaastrot8/chaastrot8_cover_sm.jpg"
                        },
                        {
                            "title": "Astronomy: A Beginner's Guide to the Universe, 5th edition",
                            "authors": [
                                "Chaisson ",
                                "McMillan"
                            ],
                            "publisher": "Pearson Education",
                            "cover_image": "http://www.webassign.net/bg/bg5_cover_sm.jpg"
                        }
                    ]
                };

    } else {
        var response =
                {
                    "recordsFound": 0,
                    "searchTerm": subject,
                    "relaxed": relax
                };
    }

    console.log(response);

}