'use strict';

const http = require('http');
const parseBody = require('./lib/parse-body.js');
const url = require('url');
const cowsay = require('cowsay');

const PORT = process.env.PORT || 3000;
const server = http.createServer(function(req, res){
  var pathname = url.parse(req.url).pathname;
  var query = url.parse(req.url, true).query;
  if (pathname == '/'){
      res.statusCode = 200;
      res.setHeader('Content-type', 'text/plain');
      res.write('Hello from my server!');
      res.end()
      return;
  };
  if (req.method === 'GET' && pathname === '/cowsay'){
    res.setHeader('Content-type', 'text/plain');
    if(typeof(query.text)==='undefined'){
      res.statusCode = 400;
      res.write(cowsay.say({text: 'You made a bad request. Shame.', f: 'default', e : 'xO', T : 'U'}));
      res.end()
      return;
    };
    res.write(cowsay.say({text: query.text, f: 'squirrel' }));
    res.end();
    return;
  };
  if(req.method === 'POST' && pathname === '/cowsay') {
    parseBody(req, function(err, data){
      if(err) {
        console.error(err);
      }
      console.log(typeof(data));
      if (typeof(data)==='undefined'){
        res.statusCode = 400;
        res.write(cowsay.say({text: 'You made a bad request. Shame.', f: 'eyes'}));
        res.end();
        return;
      }
      res.statusCode = 200;
      res.write(cowsay.say({text: data.body}));
      res.end();
      return;
    });
  };

  //unhandled
  if (pathname !== '/' && pathname !== '/cowsay'){
    res.statusCode = 501;
    res.write(cowsay.say({text: 'This route hasn\'t been set up yet. Shame.', f: 'cheese'}));
    res.end();
  };

});


server.listen(PORT, function(){
  console.log('server up:', PORT);
});

