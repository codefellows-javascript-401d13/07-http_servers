'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const bodyParse = require('./lib/parse-body.js');
const PORT = process.env.PORT || 8000;

const server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  if(req.url.pathname === '/') {
    let message = 'Hello from my server!';
    res.writeHead(200, message, {
      'Content-Type': 'text-plain'
    });
    res.end();
  }

  if(req.method === 'GET' && req.url.pathname === '/cowsay') {
    if(req.url.query.text) {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.write(cowsay.say({
        text: req.url.query.text,
        f: 'elephant'
      }));
      res.end();
    }
    if(!req.url.query.text) {
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      });
      res.write(cowsay.say({
        text: 'bad request',
        f: 'bunny'
      }));
      res.end();
    }
  }

  if(req.method === 'POST' && req.url.pathname === '/cowsay') {
    bodyParse(req, (err) => {
      if(err) return console.error(err);
      if(req.body.text) {
        res.writeHead(200, {
          'Content-Type': 'Success!'
        });
        res.write(cowsay.say({
          text: 'winner',
          f: 'daemon'
        }));
        res.end();
      }
      if(!req.body.text) {
        res.writeHead(400, {
          'Content-Type': 'Beef'
        });
        res.write(cowsay.say({
          text: 'bad request',
          f: 'cow'
        }));
        res.end();
      }
    });
  }
});

server.listen(PORT, (req, res) => {
  console.log('Server up:', PORT);
});
