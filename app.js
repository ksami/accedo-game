/*
 * Server-side JS - Main file
 */

// Environment configurables
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var _fileindex = __dirname + '/public/index.html';

// Dependencies
var express = require('express');
var app = express();
var http = require('http').Server(app);
var mongoose = require('mongoose');
var path = require('path');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Connect to database
mongoose.connect('mongodb://localhost:27017/game');

// Test db connection
var db = mongoose.connection;
db.on('error', function(){console.error('db connection error')});
db.once('open', function() {console.log('db connected')});


// Listen to <port>
http.listen(port, ipaddress, function(){
  console.log('listening on ' + ipaddress + ':' + port);
});

// Routes
app.get('/', function(req, res){
  res.sendfile(_fileindex);
});

app.use('/highscore', require('./routes').highscore);