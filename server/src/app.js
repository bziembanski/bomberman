const io = require('socket.io')({
    cors: {
        origin: ['http://localhost:3000']
    }
});
const timeLimit = 300.0;
let time = timeLimit;
const old = new Date().getTime();
let interval;
io.on('connection', socket => {
    console.log(`connect: ${socket.id}`);

    socket.on('join room', room => {
        const clients = io.of("/").adapter.rooms.get(room);
        if (clients && clients.size >= 4) {
            console.log(`cannot join room ${room}, room is full: ${socket.id}`);
            socket.emit(`full room`);
            return;
        }

        socket.join(room);
        socket.emit('joined room', room);
        console.log(`joined room ${room} (${clients ? clients.size : 1} / 4): ${socket.id}`);

        socket.on('chat message', msg => {
            console.log(`sent \"${msg}\": ${socket.id}`);
            io.to(room).emit('chat message', msg);
        });

        socket.on('leave room', () => {
            console.log(`left room ${room}: ${socket.id}`);
            socket.leave(room);
        });
    });

    if(!interval) {
        console.log("hello");
        interval = setInterval(() => {
            const newer = new Date().getTime();
            time = timeLimit - (newer - old) / 1000
            if (parseFloat(time) <= 0) {
                console.log("elo")
                clearInterval(interval);
            }
            io.emit("timer", time);
        }, 100);
    }


    socket.on('disconnect', () => {
        console.log(`disconnect: ${socket.id}`);
    });
});

io.listen(3001);