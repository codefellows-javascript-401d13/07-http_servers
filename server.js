'use strict';

const http = require('http');
const url = require('url');
const queryString = require('querystring');
const cowsay = require('cowsay');
const parseDaBody = require('./lib/parse-body.js');
const PORT = process.env.PORT || 3000;

const server = http.createServer(function(req, res){
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);



  if (req.url.pathname === '/') {
    res.writeHeader(200,{'Content-Type': 'hello from Mooville'});
    res.end();
  }

  if(req.method === 'GET' && req.url.pathname === '/cowsay' && req.url.query.text){
    res.writeHeader(200);
    res.write(cowsay.say({ text: 'req.url.query.text'}));
    res.end();
    return;
  }

  else if (req.method === 'GET' && req.url.pathname === '/cowsay' && !req.url.query.text) {
    res.writeHeader(400);
    res.write(cowsay.say({ text: 'bad request'}));
    res.end();
  }

  if (req.method === 'POST' && req.url.pathname === '/cowsay') {
    parseDaBody(req, function(err) {
      if(err) return console.err(err);

      if(req.body.text){
        res.writeHeader(200, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({ text: req.body.text}));
        res.end();
      } else {
        res.writeHeader(400);
        res.write(cowsay.say({ text: 'bad request'}));
        res.end();
      }
    });
  }
});

server.listen(PORT, function(){
  console.log('server is up and running at:', PORT);
});
