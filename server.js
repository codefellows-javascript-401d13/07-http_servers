'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay  = require('cowsay');
const parseBody = require('./lib/parse-body.js');
const PORT = process.env.PORT || 3000;

const server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);
  console.log('req url qa:', req.url.query);

  if(res.method === 'POST' && req.url.pathname === '/cowsay') {
    parseBody(req, function(err) {
      if (err) {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({ text: 'bad request' }));
      }
      if(!err) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({ text: req.body.text}));
      }
    });
  }
  if (req.method === 'GET' && req.url.pathname === '/cowsay' && req.url.query.text !== undefined){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(cowsay.say({ text: req.url.query.text.trim()}));
    res.end();
  }
  if (req.method === 'GET' && req.url.pathname === '/cowsay' && req.url.query.text === undefined){
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write(cowsay.say({ text: 'bad request'}));
    res.end();
  }
  if (req.method === 'GET' && req.url.pathname === '/') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('hello from my server!');
  }
  res.end();
});

server.listen(PORT, function() {
  console.log('server up on port: ', PORT);
});
