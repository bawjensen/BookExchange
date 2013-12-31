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
  res.render( 'index.jade', { 'title': 'W.U.B.Ex' } );
});

app.get('/sellingOffers', function(req, res) {
  res.render( 'forSale.jade', { 'title': 'W.U.B.Ex' } );
});

app.get('/buyingOffers', function(req, res) {
  res.render( 'requests.jade', { 'title': 'W.U.B.Ex' } );
});

app.get('/account', function(req, res) {
  res.render( 'account.jade', { 'title': 'W.U.B.Ex' } );
});

app.get('/create', function(req, res) {
  res.render( 'createOffers.jade', { 'title': 'W.U.B.Ex' } );
});

var port = process.env.PORT || 7500;

app.listen(port, function() {
  console.log("Listening on " + port);
});