const io = require('socket.io')({
    cors: {
        origin: '*'
    }
});
const connection = require("./handlers/connection.handler");
const room = require("./handlers/room.handler");
const game = require("./handlers/game.handler");

function Server(io) {
    this.io = io;
    this.clients = new Map();
    this.rooms = new Map();
}

const server = new Server(io);

io.on('connection', client => {
    client.on('newRoom', data => room.handleNewRoom(data, server, client));
    client.on('joinRoom', data => room.handleJoinRoom(data, server, client));

    client.on('getRooms', () => room.handleGetRooms(server, client));
    client.on('getRoomData', data => room.handleGetRoomData(data, server, client));

    client.on('dataChange', () => io.emit('dataChange'));

    client.on('isPlayerReadyUpdate', data => room.handleIsPlayerReadyUpdate(data, server));
    client.on('playerLeave', data => room.handlePlayerLeave(data, server));

    client.on('gameStart', data => room.handleGameStart(data, server, client));

    client.on('playerMove', data => game.handlePlayerMove(data, server, client))

    client.on('disconnect', () => connection.handleDisconnect(server, client));
    client.on('timer', () => game.startTimer(server));
});

io.listen(3001);