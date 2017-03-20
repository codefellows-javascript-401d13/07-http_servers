'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const parseBody = require('./lib/parse-body.js');
const PORT = process.env.PROT || 8000;

const server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);


  if (req.url.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('hello from my server!');
    // res.write(cowsay.say({ text: `test`}));
    }

  console.log('message:', req.url.query.text);

  if (req.method === 'POST' && req.url.pathname === '/cowsay') {
    parseBody(req, function(err) {
      if(err) return console.error(err);
      console.log('POST request body:', req.body);
    });
  };

  if (req.method === 'GET' && req.url.pathname === '/cowsay') {

    console.log('===============================');
    console.log(req.url.query.stuff);

    if (req.url.query.text) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write(cowsay.say({ text: `${req.url.query.text}`}));
    }
    else {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write(cowsay.say({ text: 'bad request'}));
    }

    res.end();
  }

  res.end();
});

server.listen(PORT, function() {
  console.log('server up:', PORT);
});
