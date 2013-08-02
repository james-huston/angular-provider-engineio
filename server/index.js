
var engine = require('engine.io');
var server = engine.listen(7000);

server.on('connection', function (socket) {
  socket.send({message: 'connected'});
  console.log('new connection');

  socket.on('message', function (data) {
    console.log(data);

    if (data === '[object Object]') {
      return socket.send(new Error('Stop! Error time.'));
    }

    return socket.send(data);
  });
});

