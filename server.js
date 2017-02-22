'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const fortune = require('fortune');
const parseBody = require('./lib/parse-body.js');
const PORT = process.env.PORT || 3000;


const server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);
  req.url.query.text = querystring.parse(req.url.query);

  // console.log('req body:', req.url);
  console.log('req query', req.url.query);
  console.log('text:', req.url.query.text);

  if (req.method === 'GET' && req.url.pathname === '/') {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.write('Hello from my server');
    res.end();
  }
  if (req.method === 'GET' && req.url.pathname === '/cowsay' && req.url.query.text) {
    res.writeHead(200, {
      'Content-Type': 'text/plain'u
    });
    res.write(cowsay({f: 'tux', text: `${req.url.query.text}`}))
  }
  if (req.method === 'GET' && req.url.pathname === '/cowsay') {
    res.writeHead(400, {
      'Content-Type': 'text/plain'
    });
    res.write(cowsay.say({f: 'dragon', text: 'hi there, that was a bad request. Input some text next time human!'}));
    res.end();
  };


  if (req.method === 'POST') {
    parseBody(req, function(err) {
      if(err) return console.error(err);
      console.log('POST request body', req.body);
    });
  };

  res.end();
});


server.listen(PORT, function() {
  console.log('server up:', PORT);
})
