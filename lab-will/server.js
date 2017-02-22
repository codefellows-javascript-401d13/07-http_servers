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

  res.write(`${req.headers}`);

  res.writeHead(200, 'hello from my server!', { 'Content-Type': 'text/plain' });

  // console.log('request url:', req.url);
  // console.log('request method:', req.method);
  // console.log('request headers:', req.headers);
  console.log('message:', req.url.query.text);

  if (req.method === 'POST' && req.url.pathname === '/cowsay') {
    parseBody(req, function(err) {
      if(err) return console.error(err);
      console.log('POST request body:', req.body);
    });
  };

  if (req.method === 'GET' && req.url.pathname === '/cowsay') {

    if (req.url.query.text) {
      res.write(cowsay.say({ text: `${req.url.query.text}`}));
      res.writeHead(200, { 'Content-Type': 'text/plain' });
    }
    else {
      res.write(cowsay.say({ text: 'bad request'}));
      res.writeHead(400, { 'Content-Type': 'text/plain' });
    }

    res.end();
  }

  res.end();
});

server.listen(PORT, function() {
  console.log('server up:', PORT);
});
