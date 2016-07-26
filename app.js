var app = require('http').createServer(function (req, res){})
var io = require('socket.io')(app, {
   serveClient: false,
   transport: ['websocket'],
   pingTimeout: 100  * 1000,
   pingInterval: 40 * 1000
});

app.listen(8086);

io.on('connection', function (socket) {
    console.log('connected');
    setTimeout(() => {
      for (var i = 0; i < 10000; i++){
         io.emit('this', { will: 'be received by everyone'});
      }
   }, 1000 * 5);


    socket.on('private message', function (from, msg) {
        console.log('I received a private message by ', from, ' saying ', msg);
    });

    socket.on('disconnect', function () {
        console.log('disconected');
        io.emit('user disconnected');
    });
});
