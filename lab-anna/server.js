'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const parseBody = require('./lib/parse-body.js');
const PORT = process.env.PORT || 3000;

const cowSays = function(obj, res) {
  if (obj === undefined) {
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write(cowsay.say({ text: 'bad request' }));
  } else {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(cowsay.say({ text: obj}));
  };
};

const server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  if (req.method === 'POST' && req.url.pathname === '/cowsay') {
    parseBody(req, function(err, parsed) {
      console.log("HH", err, req.body, parsed, req.body.text);
      if (err) {
        cowSays(undefined, res);
        res.end();
        return;
      };

      cowSays(req.body.text, res);
      res.end();
    });
    return;
  };

  if (req.method === 'GET') {
    if (req.url.pathname === '/') {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write('Welcome to my server!\n');
    };

    if (req.url.pathname === '/cowsay') {
      cowSays(req.url.query.text, res);
    };
    res.end();
  };
});

server.listen(PORT, function() {
  console.log('server up:', PORT);
});
