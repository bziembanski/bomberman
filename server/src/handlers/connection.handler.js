function handleDisconnect(server, client) {
    const roomId = server.clients[client.id].roomId;
    removeClientData(client, server);
    removeRoomData(roomId);

    server.io.emit('dataChange');
}

function removeClientData(client, server) {

    client.rooms.forEach(room => {
        if(room !== client.id && client.rooms.has('room')){
            client.leave(room);
        }
    });
    server.clients.delete(client.id);
}

function removeRoomData(roomId, server) {
    const room = server.io.sockets.adapter.rooms.get(roomId)

    if (room === undefined){
        server.rooms.delete(roomId);
    }
}

module.exports = {
    handleDisconnect
}