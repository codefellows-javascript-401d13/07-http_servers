'use strict';
module.exports = function(req, callback){
  req.body = '';
  req.on('data', function(data){
    req.body += data.toString();
  });//end on data

  req.on('end', function(){
    try {
      req.body = JSON.parse(req.body);
      callback(null, req.body);
    } catch (err) {
      callback(err);
    }
  });//end on end
};
