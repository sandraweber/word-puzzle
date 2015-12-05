/*global require,console*/
/*jslint node: true */
/*jslint es5: true */
'use strict';

//** General HTTP Server Modules **/
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');

/** Environment Modules **/
var nconf = require('nconf');


var puzzleRoutes = require('puzzle-routes');



/** Configuration */
nconf.argv().env().file({
    file: 'conf_' + process.env.NODE_ENV + '.json'
});

console.log('CONFIG: ' + 'conf_' + process.env.NODE_ENV + '.json');


/**
 * Static Server
 */
app.use(express.static('dist'));

var static_router = express.Router();

static_router.get('/app', function (req, res) {
    res.sendFile(path.join(__dirname, 'app.html'));
});

app.use('/', static_router);


/** 
 * API Server
 */
app.use(cookieParser());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", 'http://' + nconf.get('app-host') + ':' + nconf.get('app-port'));
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
var api_router = express.Router();
puzzleRoutes(api_router);
app.use('/api', api_router);


app.listen(nconf.get('app-port'), function () {
    var host = nconf.get('app-host'),
        port = nconf.get('app-port');
    console.log('Server listening at http://%s:%s', host, port);
});
