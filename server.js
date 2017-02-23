'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const parseBody = require('/lib/parse-body.js');
const PORT = process.env.PORT || 8000;

const server = http.createServer(function(req, res){
    req.url = url.parse(req.url);
    req.url.query = querystring.parse(req.url.query);

    if (req.method === 'POST') {
        parseBody(req, function(err) {
            if(err){
            console.error(err);

        res.statusCode = 400;
        res.write(cowsay.say({ text: 'bad moooove'}));
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
    return
}

res.statusCode = 400;
res.write

    if ( req.method === 'GET' && req.url.pathname === '/cowsay'){
        res.setHeader('Content-type, text/plain');
        if (req.url.pathname === '/cowsay') {
           let message = req.body.text;
           let cow = req.body.cow; 
        
        if ( message ) {
    res.write(cowsay.say({
        text: message,
        f: cow,
    }));
        res.write('Status Code Fo Hunnit');
        res.statusCode = 400;
        res.write(cowsay.say({ text: 'bad request'}));
        res.end();
        return;
    });
    }; 
});
server.listen(PORT, function(){
    console.log('server up and running:', PORT);
})