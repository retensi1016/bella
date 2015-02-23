/**
 * Module dependencies.
 */

var express = require('express'); 
var http = require('http'); 
var path = require('path'); 
var robots = require('robots.txt');
var morgan = require('morgan');
var favicon = require('serve-favicon');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');

var routes = require('./routes');
var user = require('./routes/user');

var app = express();

// configuration value
var oneDay = 86400000;

// all environments
app.set('port', process.env.PORT || 3006);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public'), { maxAge: oneDay }));
app.use(favicon(path.join(__dirname, 'public' , 'favicon.ico'))); 
app.use(robots(path.join(__dirname, 'public' , 'robots.txt')));

// development only
if ('development' == app.get('env')) {
	app.use(errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
