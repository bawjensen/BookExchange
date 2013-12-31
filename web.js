// web.js
var express = require("express");
var logfmt = require("logfmt");

var app = express();

app.configure(function() {
	app.use(logfmt.requestLogger());
	app.use('static', express.static(__dirname + '/static'));
	app.use(express.static(__dirname));
	app.engine('.html', require('ejs').__express);
});

app.get('/', function(req, res) {
  res.render( 'index.jade', { 'title': ' ' } );
});

app.get('/sellingOffers', function(req, res) {
  res.render( 'forSale.jade', { 'title': 'Offers' } );
});

app.get('/buyingOffers', function(req, res) {
  res.render( 'requests.jade', { 'title': 'Requests' } );
});

app.get('/account', function(req, res) {
  res.render( 'account.jade', { 'title': 'Account' } );
});

app.get('/create', function(req, res) {
  res.render( 'createOffers.jade', { 'title': 'Create' } );
});

app.get('/test', function(req, res) {
  res.render( 'stupid.html' );
})

var port = process.env.PORT || 7500;

app.listen(port, function() {
  console.log("Listening on " + port);
});