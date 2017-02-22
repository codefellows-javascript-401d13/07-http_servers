'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const bodyParse = require('./lib/body-parse.js');
const PORT = process.env.PORT || 3000;

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
        'Content-Type': 'A Sweet Ass Moo-Moo'
      });
      res.write(cowsay.say({
        text: req.url.query.text,
        f: 'bong'
      }));
      res.end();
    }
    if(!req.url.query.text) {
      res.writeHead(400, {
        'Content-Type': 'A Failure Moo-Moo'
      });
      res.write(cowsay.say({
        text: 'not chill dude, bad request',
        f: 'sodomized'
      }));
      res.end();
    }
  }

  if(req.method === 'POST' && req.url.pathname === '/cowsay') {
    bodyParse(req, (err) => {
      if(err) return console.error(err);
      if(req.body.text) {
        res.writeHead(200, {
          'Content-Type': 'Success, I Am Your Father!'
        });
        res.write(cowsay.say({
          text: req.body.text,
          f: 'vader'
        }))
        res.end();
      }
      if(!req.body.text) {
        res.writeHead(400, {
          'Content-Type': 'Failing Your Father-Figure'
        });
        res.write(cowsay.say({
          text: 'You Deliberately Disobeyed Me (bad request)',
          f: 'moofasa'
        }))
        res.end();
      }
    });
  }
});

server.listen(PORT, (req, res) => {
  console.log('Server up:', PORT);
});

// function checkForQuery(query) {
//   if(!query.text) req.url.query.text = 'not chill dude, bad request';
// }
