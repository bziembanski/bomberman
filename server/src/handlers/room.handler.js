const {ClientData, RoomData} = require("../common/data.common");

let gRoomId = 0;
function makeRoomId() {
    gRoomId++;
    return gRoomId;
}

function handleNewRoom(data, server, client) {
    const roomId = makeRoomId();
    server.clients[client.id] = new ClientData(roomId, data.nickname, false);

    server.rooms[roomId] = new RoomData(data.maxPlayers);

    client.join(roomId);

    client.positionInRoom = 1;
    client.emit('init', {
        roomId: roomId,
        positionInRoom: client.positionInRoom
    });
    console.log(client.id);
    console.log(server.io.sockets.adapter.rooms.get(roomId));
    server.io.emit('dataChange');
}

function handleJoinRoom(data, server, client) {
    const roomId = parseInt(data.roomId);
    server.clients[client.id] = new ClientData(roomId, data.nickname, false);

    const room = server.io.sockets.adapter.rooms.get(roomId);

    const numClients = room ? room.size : 0;
    const maxPlayers = server.rooms[roomId].maxPlayers;
    if (numClients === 0) {

        client.emit('unknownGame');
        return;
    } else if (numClients >= maxPlayers) {
        client.emit('tooManyPlayers');
        return;
    }

    client.join(roomId);

    client.positionInRoom = numClients;
    console.log(server.io.sockets.adapter.rooms.get(roomId));
    server.io.emit("dataChange");

    // client.emit('init', client.positionInRoom);
    // io.sockets.in(data.roomId).emit("users", {nicknames: nicknames});
}

function handleGetRooms(server, client) {
    const roomList = Object.keys(server.rooms).map(room => {
        const members = server.io.sockets.adapter.rooms.get(parseInt(room));
        let host;
        members.forEach(mem => {
            if(server.io.sockets.sockets.get(mem).positionInRoom === 1) {
                host = server.clients[mem].nickname;
            }
        });
        return {
            roomId: room,
            numOfPlayers: Array.from(members).length,
            maxPlayers: server.rooms[room].maxPlayers,
            host: host
        };
    });

    client.emit('rooms', roomList);
}

function handleGetRoomData(data, server, client){
    const roomId = parseInt(data.roomId);
    const members = server.io.sockets.adapter.rooms.get(roomId);
    let players = [];
    members && members.forEach((player) => {
        players.push({
            nickname: server.clients[player].nickname,
            playerId: player,
            position: server.io.sockets.sockets.get(player).positionInRoom,
            isReady: server.clients[player].isReady,
        });
    });
    const maxNumberOfPlayers = server.rooms[roomId].maxPlayers;
    client.emit("roomData", {players: players, maxNumberOfPlayers: maxNumberOfPlayers, id: roomId});
}

function handleIsPlayerReadyUpdate(data, server) {
    data.forEach(player => {
        server.clients[player.playerId].isReady = player.isReady;
    });
    server.io.emit("dataChange");
}

function handlePlayerLeave(data, server, client) {
    const clientId = data.clientId;
    const roomId = server.clients[clientId].roomId;

    client.leave(server.clients[clientId].roomId);
    server.clients.delete(clientId);

    const room = server.io.sockets.adapter.rooms.get(roomId);

    if (room === undefined) {
        server.rooms.delete(roomId);
    }

    server.io.emit('dataChange');
}

module.exports = {
    handleNewRoom,
    handleJoinRoom,
    handleGetRooms,
    handleGetRoomData,
    handleIsPlayerReadyUpdate,
    handlePlayerLeave
}