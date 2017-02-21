'use strict';

const http = require('http');
const url = require('url');
const query = require('querystring');
const cowsay = require('cowsay');
const PORT = process.env.PORT || 3000;
const parseBody = require('./lib/parse-body.js');
const server = http.createServer(function(req, res){
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);
  if()
  if()
  res.end()
});

server.listen(PORT, function(){
  console.log(PORT);
});
