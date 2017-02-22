'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const parseBody = require('./lib/parse-body.js');
const PORT = process.env.PORT || 3000;
//done setting up variables/requiring in modules

//parseBody(req, cb)

//create server variable which creates a new server using the http module
const server = http.createServer(function(req,res){
  //easily access the url of our request by using the required 'url' module with parse method
  req.url = url.parse(req.url);
  //easily access the querystring of the url by utilizing the querystring module with the parse method with the request's url and query passed in.
  req.url.query = querystring.parse(req.url.query);
  // if(req.method === 'POST'){
  //   parseBody(req, function(err){
  //     if(err) return console.error(err);
  //     console.log('here is our nice body:', req.body);
  //   });
  // };
  if(req.method === 'POST' && req.url.pathname === '/cowsay'){
    // if(req.url.query){
    parseBody(req, function(err){
      if(err) {
        console.error(err);
        res.statusCode = 400;//this isn't working?
        res.end();
      };
      console.log('post request body:', req.body);
      console.log('POST request body content:', req.body.text);

    });
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });

    res.end();
    //this little blurp is working
    // if(req.url.query.text){
    //   console.log('you sent the body and here it is:', req.url.query.text);
    // }
  };

  // * For all **POST** requests made to `/cowsay`, the server should respond with the following:
  //   √ the response header should include `Content-Type: text/plain`
  // for the next part, use this type of syntax  http POST :8000/cowsay text=whatevertextyouwant
  //   √ if the JSON `{text: messsage}` is set in the body, respond with:
  //     √ a status code of 200
  //     * a response body including the value returned from `cowsay.say({ text: <querystring text> })`
  //   * if the JSON `{text: messsage}` is **not** set in the body, respond with:
  //       * a status code of 400
  //       * a body including the value returned from `cowsay.say({ text: 'bad request' })`

  //this is part of the assignment and it works
  if(req.method === 'GET' && req.url.pathname === '/'){
    console.log('whoa! it is working!');
    // console.log('THIS IS THE REQUEST',req);
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.write("hello from my server!");
    res.end();
  };


//THIS WORKS FOR THE MOST PART! 5:15
  if(req.method === 'GET' && req.url.pathname === '/cowsay' ) {
      // log the url and then the query string;
      console.log('this is our pathname:',req.url.pathname);
      console.log('this is our query string:', req.url.query);
    if(req.url.query.text){
      // res.writeHead(200, {
      //   'Content-Type': 'text/plain'
      // });
      console.log('hooray');
      console.log('here is what the querystring was:', req.url.query.text);
      // res.write(cowsay.say({text: `${req.url.query.text}` }));
      res.write(cowsay.say({text: req.url.query.text }));

      res.end();
    } else {
      console.log('404 ran');
      res.statusCode = 400;
      res.write(cowsay.say({text: 'bad request' }));
      res.end();
    };
    res.end();
  };//end if

  res.end();


 });

server.listen(PORT, function(){
  console.log('server started on port:', PORT);
});
