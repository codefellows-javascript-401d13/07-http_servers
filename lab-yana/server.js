'use strict';

const http = require('http');
const url = require('url');
const cowsay = require('cowsay');
const querystring = require('querystring');
const parseBody = require('./lib/parse-body.js');
const PORT = 9988;

const server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);
  if (req.method === 'POST') {
    parseBody(req, function(err) {
      if (err) return console.error(err);
      console.log('POST request body content: ', req.body);
    });
  }
  if (req.method === 'GET' && req.url.pathname ==='/cowsay') {
    res.write(cowsay.say( { text: 'MOOOOOOOOOOO!!!!!!!'} ));
    res.end();
  }
});

server.listen(PORT, function() {
  console.log('server up:', PORT);
});
