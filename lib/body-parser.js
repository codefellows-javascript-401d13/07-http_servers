'use strict';

//vanilla body parser for requests
//takes in request, aggregates the information
//which is contained in JSON format and parses it
//then sends it as an argument to the callback

module.exports = function(req, callback) {
  req.body = '';

  req.on('data', function(data) {
    req.body += data.toString();
  });

  req.on('end', function() {
    try {
      req.body = JSON.parse(req.body);
      callback(null, req.body);
    } catch (err) {
      callback(err);
    }
  });
};
