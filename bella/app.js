/**
 * Module dependencies.
 */

var express = 
	require('express'), 
	http = require('http'), 
	path = require('path'), 
	robots = require('robots.txt'),
	favicon = require('serve-favicon'),
	
	routes = require('./routes'), 
	user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3003);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 86400 }));
app.use(favicon(path.join(__dirname, 'public' ,'favicon.ico'))); 
app.use(robots(path.join(__dirname, 'public' , 'robots.txt')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
