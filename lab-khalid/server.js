'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const bodyParser = require('./lib/parse-body.js');
const PORT = process.env.PORT || 3000;

const Server = http.createServer(function(req, res){
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);
  // console.log('req: ', req);
  // console.log('req.url: ', req.url);
  // console.log('req.url.query: ', req.url.query);
  // console.log('request method:', req.method);
  console.log(req.url.query);
  if(req.method === 'GET' && req.url.pathname === '/cowsay'){
    if(req.url.query.text){
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.write(cowsay.say({text: req.url.query.text}));
      console.log(req.url.query.text.length);
      res.end();
    } else {
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      });
      res.write(cowsay.think({text:'bad request'}));
      res.end();
    }
    return;
  }
  if(req.method === 'POST' && req.url.pathname === '/'){
    bodyParser(req, function(err){
      if (err) return console.error('ERROR!: ',err);
      console.log('POST req.body: ', req.body);
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.write(cowsay.say({text:'HELLO FROM MY SERVER'}));
      console.log(res);
      res.end();
    });
    return;
  }
  if(req.method === 'POST' && req.url.pathname === '/cowsay'){
    bodyParser(req, function(err){
      if(err) console.error(err);
      if(req.body.text){
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.write(cowsay.say({text: req.body.text}));
        res.end();
      } else {
        res.writeHead(400, {
          'Content-Type': 'text/plain'
        });
        res.write(cowsay.say({text: 'bad request'}));
        res.end();
      }
    });
    return;
  }
  res.end();
});


Server.listen(PORT, function(){
  console.log('SERVER RUNNING AT PORT', PORT);
});
