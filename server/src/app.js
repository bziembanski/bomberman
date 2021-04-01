const io = require('socket.io')({
    cors: {
        origin: ['http://localhost:3000']
    }
});

io.on('connection', socket => {
    console.log(`connect: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`disconnect: ${socket.id}`);
    });

    socket.on('chat message', msg => {
        console.log(msg);
        io.emit('chat message', msg);
    });
});

io.listen(3001);