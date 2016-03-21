/*
 * Server-side JS - Main file
 */

// Environment configurables
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var dbport = process.env.OPENSHIFT_MONGODB_DB_PORT || 27017;
var dbaddress = process.env.OPENSHIFT_MONGODB_DB_HOST || '127.0.0.1';
var dbuser = process.env.OPENSHIFT_MONGODB_DB_USERNAME || '';
var dbpass = process.env.OPENSHIFT_MONGODB_DB_PASSWORD || '';
var dbname = 'accedogame';
var _fileindex = __dirname + '/public/index.html';

// Dependencies
var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Connect to database
mongoose.connect('mongodb://'+dbaddress+':'+dbport+'/'+dbname, {
  user: dbuser,
  pass: dbpass
});

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

app.use(bodyParser.urlencoded({extended: false})); 
app.use('/highscore', require('./routes').highscore);