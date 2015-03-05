'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var cookieParser   = require('cookie-parser');
//var session        = require('express-session');
var config         = require('./config/config');
var oriento        = require('oriento');

// set our port
var port = config.port;
var host = config.host;

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

app.use(cookieParser());

// app.use(session({
//   secret: config.secrets.session
// }));

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/../client'));

// routes ==================================================
require('./routes')(app); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port, host);

// shoutout to the user
console.log('Server running on my port: ' + port, config.db.host);

// expose app
exports = module.exports = app;

// connect to database
// global.db = oriento(config.db).use({
//   name: 'rockridge',
//   username: 'admin',
//   password: 'admin'
// });
