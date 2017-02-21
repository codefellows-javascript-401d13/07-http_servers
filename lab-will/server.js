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
  console.log('request headers:', req.headers);
  // console.log('request queries', req.url.query);


  if (req.method === 'POST' && req.url.pathname === '/cowsay') {
    parseBody(req, function(err) {
      if(err) return console.error(err);
      console.log('POST request body:', req.body);
    });
  };

  if (req.method === 'GET' && req.url.pathname === '/cowsay') {
    
    res.write(cowsay.say({ text: 'hello from cowville'}));
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    res.end();
  }

  res.end();
});

server.listen(PORT, function() {
  console.log('server up:', PORT);
});
