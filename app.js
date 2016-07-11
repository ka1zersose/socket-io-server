var io = require('socket.io')(8086);

io.on('connection', function (socket) {
    console.log('connected');
    io.emit('this', { will: 'be received by everyone'});

    socket.on('private message', function (from, msg) {
        console.log('I received a private message by ', from, ' saying ', msg);
    });

    socket.on('disconnect', function () {
        console.log('disconected');
        io.emit('user disconnected');
    });
});
