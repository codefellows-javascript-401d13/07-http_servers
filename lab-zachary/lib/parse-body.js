'use strict';

module.exports = function(req, callback) {
  req.body = '';

  req.on('data', data =>{
    req.body += data.toString();
  });
  req.on('end', function() {
    try{
      req.body = JSON.parse(req.body);
      console.log(req.body);
      callback(null, req.body);
    } catch (err) {
      callback(err);
    }
  });
};
