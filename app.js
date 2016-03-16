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
var fs = require('fs');
app.use(express.static(__dirname + '/public'));


// Listen to <port>
http.listen(port, ipaddress, function(){
  console.log('listening on ' + ipaddress + ':' + port);
});

// Route handler
app.get('/',function(req, res){
  res.sendfile(_fileindex);
});
