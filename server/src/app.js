const io = require('socket.io')({
    cors: {
        origin: ['http://localhost:3000']
    }
});

let gRoomId = 0; // todo
function makeRoomId() {
    gRoomId++;
    return gRoomId;
}

const clientData = {};
const roomsData = {};

io.on('connection', client => {
    client.on('newRoom',  handleNewRoom);
    client.on('joinRoom', handleJoinRoom);
    client.on('getRooms', handleGetRooms);

    function handleNewRoom(data) {
        const roomId = makeRoomId()
        clientData[client.id] = {
            roomId: roomId,
            nickname: data.nickname
        }

        roomsData[roomId] = {
            maxPlayers: data.maxPlayers
        }

        client.join(roomId);

        client.positionInRoom = 1;
        client.emit('init', {
            roomId: roomId,
            positionInRoom: client.positionInRoom
        });
    }

    function handleJoinRoom(data) {
        clientData[client.id] = {
            roomId: data.roomId,
            nickname: data.nickname
        }

        const room = io.sockets.adapter.rooms.get(parseInt(data.roomId));
        const numClients = room ? room.size : 0;
        const maxPlayers = roomsData[data.roomId].maxPlayers;

        if (numClients === 0) {
            client.emit('unknownGame');
            return;
        } else if (numClients >= maxPlayers) {
            client.emit('tooManyPlayers');
            return;
        }

        client.join(data.roomId);
        client.positionInRoom = numClients;
        client.emit('init', client.positionInRoom);
    }

    function handleGetRooms() {
        const roomList = Object.keys(roomsData).map(room => {
            const members = io.sockets.adapter.rooms.get(parseInt(room));

            let host;
            members.forEach(mem => {
                if(io.sockets.sockets.get(mem).positionInRoom === 1) {
                    host = clientData[mem].nickname;
                }
            })

            return {
                roomId: room,
                numOfPlayers: Array.from(members).length,
                maxPlayers: roomsData[room].maxPlayers,
                host: host
            };
        });

        client.emit('rooms', roomList);
    }
});

io.listen(3001);