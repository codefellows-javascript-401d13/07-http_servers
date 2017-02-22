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

    console.log('URL query:', req.url.query);
    
    // console.log('the whole request object:', req);

    if (req.method === 'POST') {
        parseBody(req, function(err) {
            if (err) return console.error(err);
            console.log('POST request body content:', req.body);
        });
    };
    
    if (req.url.pathname === '/') {
        var message = 'Hello from my server!';
        res.writeHead(200, message, {'Content-Type': 'text/plain'});
        console.log('GET response status message:', res.statusMessage);        
        res.end();
    };


    if (req.method === 'GET' && req.url.pathname === '/cowsay') {
        res.writeHead(200, {'Content-Type': 'text/plain'});

        if (req.url.query.text) {
            console.log('anything');
            res.write(cowsay.say({
                text: `${req.url.query.text}`
            }));
            res.end();
        };

        if (!req.url.query.text) {
            console.log('empty query statement should run');
            res.statusCode = 400;
            res.write(cowsay.say({
                text: 'bad request'
            }));
            res.end();          
        };
    };

    if (req.method === 'POST' && req.url.pathname === '/cowsay') {
        
    }

    res.end();
});

server.listen(PORT, function() {
    console.log('server is up at:', PORT);
});