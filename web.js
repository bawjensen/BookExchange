// web.js
var express = require("express"),
    logfmt = require("logfmt"),
    Firebase = require("firebase");

var app = express();

app.configure(function() {
	app.use(logfmt.requestLogger());
  app.use('/js', express.static(__dirname + '/js'));
  app.use('/css', express.static(__dirname + '/css'));
	app.use('/static', express.static(__dirname + '/static'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session( { secret: 'spectreCycle' } ));

	app.engine('.html', require('ejs').__express);
});

app.post('/login', function(req, res) {
  console.log(req.body.username);
  console.log(req.body.password);
  res.redirect('/');
});

app.get('/', function(req, res) {
  res.render( 'mainpage.jade'/*, { 'title': 'USE Wheaton' }*/ );
});

var port = process.env.PORT || 7500;

app.listen(port, function() {
  console.log("Listening on " + port);
});