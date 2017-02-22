'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const bodyParser = require(`${__dirname}/lib/body-parser.js`);
const cowsay = require('cowsay');
const PORT = process.env.PORT || 3000;

const server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  if(req.method === 'GET' && req.url.pathname === '/cowsay') {
    if (req.url.query.text) {
      let cowSpeak = req.url.query['text'];
      res.writeHead(200, 'OK', { 'Content-Type': 'text/plain'});
      res.write(cowsay.say({ text: cowSpeak }));
      res.end();
      return; ///why does this need to be here when I have the res.end??
    }
    res.writeHead(400, 'Bad Request', {'Content-Type': 'text/plain'});
    res.write(cowsay.say({ text: 'bad request'}));
    res.end();
  }

  if(req.method === 'POST' && req.url.pathname === '/cowsay') {
    bodyParser(req, function(err, data) {
      console.log('err:', err);
      console.log('data:', data);
      if (err) {
        console.log('Uhoh');
        res.writeHead(400, 'Bad Request', {'Content-Type': 'text/plain'});
        res.write(cowsay.say({ text: 'bad request'}));
        res.end();
        return;
      }
      if(data['text']) {
        let cowSpeak = data['text'];
        console.log(cowSpeak);
        res.writeHead(200, 'OK', {'Content-Type': 'text/plain'});
        res.write(cowsay.say({ text: cowSpeak }));
        res.end();
        return;
      }
    });
  }

  if (req.method === 'GET' && req.url.pathname === '/') {
    res.writeHead(200, 'OK', { 'Content-Type': 'text/plain'});
    res.write('Hello from my server!');
    res.end();
  }

  if (req.method === 'POST' && req.url.pathname === '/') {
    res.writeHead(200, 'OK', { 'Content-Type': 'text/plain'});
    res.write('Hello from my server!');
    res.end();
  }
  res.end();
});

server.listen(PORT, () => {
  console.log(`Server's up dude! PORT:${PORT}`);
});
