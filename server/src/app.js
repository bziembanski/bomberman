const io = require('socket.io')({
    cors: {
        origin: ['http://localhost:3000']
    }
});
const connection = require("./handlers/connection.handler");
const room = require("./handlers/room.handler");
const game = require("./handlers/game.handler");

const clientData = {};
const roomsData = {};

io.on('connection', client => {
    client.on('newRoom', data => room.handleNewRoom(data, server, client));
    client.on('joinRoom', data => room.handleJoinRoom(data, server, client));
    client.on('getRooms', () => room.handleGetRooms(server, client));
    client.on('getRoomData', data => room.handleGetRoomData(data, server, client));
    client.on('dataChange', () => io.emit('dataChange'));
    client.on('isPlayerReadyUpdate', data => room.handleIsPlayerReadyUpdate(data, server));
    client.on('playerLeave', data => room.handlePlayerLeave(data, server, client));
    client.on('disconnect', () => connection.handleDisconnect(server, client));
    client.on('timer', () => game.startTimer(server));
});

io.listen(3001);