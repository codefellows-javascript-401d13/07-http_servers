
'use strict';

module.exports = function (req, cb) {
  req.body = '';
  req.on('data', function(data) {
    req.body += data.toString();
  });
  req.on('end', function() {
    try {
      req.body = JSON.parse(req.body);
      cb(null, req.body);
    } catch (err) { cb(err); }
  });
};
