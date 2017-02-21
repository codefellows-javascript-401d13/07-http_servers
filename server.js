'use strict';

const http = require('http').createServer;
const PORT = process.env.PORT || 3000;

const server = http(function(req, res) {
  if (req) console.log(`req: ${req}`);
  if (res) console.log(`res: ${res}`);
  res.end();
});

server.listen(PORT, () => {
  console.log(`Server's up dude! PORT:${PORT}`);
});
