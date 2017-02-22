'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const parseBody = require('./lib/parse-body.js');
const PORT = process.env.PORT || 3000;

const server = http.createServer(function(req,res){

  req.url = url.parse(req.url);

  req.url.query = querystring.parse(req.url.query);

  if(req.method === 'POST' && req.url.pathname === '/cowsay'){

    if(req.url.query.text){
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.write('Status code:' + res.statusCode);

      res.write(cowsay.say({text: req.url.query.text }));

      res.end();
    }

    parseBody(req, function(err){
      console.log('ok the parseBody function request works...here is the request:', req);
      if(err) {
        console.error(err);
        res.end();
      }
      console.log('post request body:', req.body);
    });
    res.writeHead(400, {
      'Content-Type': 'text/plain'
    });
    res.write('Status Code: 400');
    res.write(cowsay.say({text: 'bad request' }));
    res.end();
  }
  if(req.url.pathname === '/'){
    console.log('pathname '/' was hit!');
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.write('hello from my server!\n');
    res.write('Status Code of: ' + res.statusCode);
    res.end();
  }

  if(req.method === 'GET' && req.url.pathname === '/cowsay' ) {
      // log the url and then the query string;
    console.log('this is our url:', req.url);
    console.log('this is our pathname:',req.url.pathname);
    console.log('this is our query string:', req.url.query);
    if(req.url.query.text){
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.write('Status code:' + res.statusCode);
      console.log('this request url includes a querystring (...?text=<whatever>)');
      console.log('here is what the querystring was:', req.url.query.text);
      res.write(cowsay.say({text: req.url.query.text }));

      res.end();
    } else {
      res.write('Status code: 400');
      res.statusCode = 400;
      res.write(cowsay.say({text: 'bad request' }));
      res.end();
    }
    res.end();
  }//end if

  res.end();

});//end server

server.listen(PORT, function(){
  console.log('server started on port:', PORT);
});//end server listen
