'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const PORT = process.env.PORT || 3000;
const parseDat = require('./lib/parse-dat-body.js');

const server = http.createServer((req, res) => {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  console.log('qs', req.url.query);
  console.log('url', req.url);
  console.log('method', req.method);

  res.setHeader('Content-Type', 'text/plain');

  if (req.method === 'GET') {
    if (req.url.pathname === '/cowsay') {
      let message = req.url.query.text;
      let cow = req.url.query.cow;

      if ( message ) {
        res.write(cowsay.say({
          text: message,
          f: cow,
        }));
        res.end();
        return;
      }

      res.statusCode = 400;
      res.write(cowsay.say({ text: 'bad request yo' }));
      res.end();
      return;
    }
    // path: /
    res.write('hello from my server!');
    res.end();
    return;
  }

  if (req.method === 'POST') {
    parseDat(req, function(err) {
      if (err) {
        console.error(err);
        res.statusCode = 400;
        res.write(cowsay.say({ text: 'bad request yo' }));
        res.end();
        return;
      }
      let message = req.body.text;
      let cow = req.body.cow;

      if ( message ) {
        res.write(cowsay.say({
          text: message,
          f: cow,
        }));
        res.end();
        return;
      }

      res.statusCode = 400;
      res.write(cowsay.say({ text: 'bad request yo' }));
      res.end();
      return;
    });
  }
});

server.listen(PORT, () => console.log('Cowz locked and loaded on: ', PORT));
