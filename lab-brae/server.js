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
        
    if (req.url.pathname === '/') {
        var message = 'Hello from my server!';
        res.writeHead(200, message, {'Content-Type': 'text/plain'});
        res.end();
    };


    if (req.method === 'GET' && req.url.pathname === '/cowsay') {
        res.setHeader('Content-Type', 'text/plain');

        if (req.url.query.text) {
            res.statusCode = 200;
            res.write(cowsay.say({
                text: `${req.url.query.text}`,
                f: 'whale'
            }));
            res.end();
        };

        if (!req.url.query.text) {
            res.statusCode = 400;
            res.write(cowsay.say({
                text: 'bad request',
                f: 'flaming-sheep'
            }));
            res.end();          
        };
    };

    if (req.method === 'POST' && req.url.pathname === '/cowsay') {
       parseBody(req, function(err) {
        res.setHeader('Content-Type', 'text/plain');
        
        if (req.body.text) {
            res.statusCode = 200;
            res.write(cowsay.say({
                text: `${req.body.text}`,
                f: 'hedgehog'
            }));
            
            res.end();
        }; 

        if (err) {
            res.statusCode = 400;
            res.write(cowsay.say({
                text: 'bad request',
                f: 'milk'
                }));
                
                res.end();
            };
         });
       return;
    };
    res.end();
});

server.listen(PORT, function() {
    console.log('server is up at:', PORT);
});