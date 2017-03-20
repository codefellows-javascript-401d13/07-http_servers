'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const parseBody = require('./lib/parse-body.js');
const PORT = process.env.PORT || 3000;

const server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);



  if (req.method === 'POST') {
    parseBody(req, function(err) {
      if (err) return console.error(err);
      console.log('POST request body:', req.body);
    });
  };


  if(req.method === 'GET' && req.url.pathname === '/cowsay' && req.url.query) {
      if(req.url.query.text ==='dragon') {
        res.write(cowsay.say({f: 'dragon', text: 'DRAAAAAAGON!!'}));
        res.end();
      } else{
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({text: req.url.query.text}));
        res.end();
      }
    }

    else {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text: 'bad request'}));
    }
    res.end();
    return;
  });

  server.listen(PORT, () => {
    console.log('Server running on PORT:', PORT);
  });
