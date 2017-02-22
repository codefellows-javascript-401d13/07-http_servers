'use strict';

const http = require('http');
const url = require('url');
const cowsay = require('cowsay');
const querystring = require('querystring');
const parseBody = require('./lib/parse-body.js');
const PORT = 9988;

const server = http.createServer(function(req, res) {
  let bad = 'Bad Request.';
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);
  if (req.url.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text-plain' } );
    res.write('hello from my server!');
    res.end();
  }
  if (req.method === 'POST' && req.url.pathname ==='/cowsay') {
    parseBody(req, function(err) {
      if (err) response(res, 400, bad);
      if (req.body.text) response(res, 200, req.body.text);
    });
    return;
  }
  if (req.method === 'GET' && req.url.pathname ==='/cowsay') {
    if (req.url.query.text) response(res, 200, req.url.query.text);
    else response(res, 400, bad);
  }
  res.end();
});

function response (res, code, string) {
  res.writeHead(code, {'Content-Type': 'text-plain'});
  res.write(cowsay.say( { text: `${string} MOOOOOOO!!!!!!` } ));
  res.end();
}

server.listen(PORT, function() {
  console.log('server up:', PORT);
});
