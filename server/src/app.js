const io = require('socket.io')({
    cors: {
        origin: ['http://localhost:3000']
    }
});

const timeLimit = 10.0;
let time = timeLimit;
let old;
let interval;
function startTimer(){
    io.emit("timer", timeLimit.toFixed(1));
    old = undefined;
    setTimeout(()=>{
        interval = setInterval(() => {
            if(!old) old = new Date().getTime();
            const newer = new Date().getTime();
            time = (timeLimit - (newer - old) / 1000).toFixed(1);
            if (parseFloat(time) <= 0) {
                clearInterval(interval);
                time = "bang bang"
            }
            io.emit("timer", time);
        }, 100);
    }, 2000);
}

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
    client.on('getRoomData', handleGetRoomData);
    client.on("dataChange", ()=>io.emit("dataChange"));
    client.on("disconnect", () => {
        console.log("elo");
        io.emit("dataChange");
    });
    client.on("disco", () => {
        io.emit("dataChange");
    });
    client.on("timer", () => {
        startTimer();
    });
    if(!interval) {
        startTimer();
    }
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
        console.log(client.id);
        console.log(io.sockets.adapter.rooms.get(roomId));
        io.emit("dataChange");
    }

    function handleJoinRoom(data) {
        const roomId = parseInt(data.roomId);
        clientData[client.id] = {
            roomId: roomId,
            nickname: data.nickname
        }

        client.join(roomId);

        const room = io.sockets.adapter.rooms.get(roomId);
        const numClients = room ? room.size : 0;
        const maxPlayers = roomsData[roomId].maxPlayers;

        if (numClients === 0) {
            client.emit('unknownGame');
            return;
        } else if (numClients > maxPlayers) {
            client.emit('tooManyPlayers');
            return;
        }

        client.positionInRoom = numClients;
        console.log(io.sockets.adapter.rooms.get(roomId));
        io.emit("dataChange");

        // client.emit('init', client.positionInRoom);
        // io.sockets.in(data.roomId).emit("users", {nicknames: nicknames});
    }

    function handleGetRooms() {
        const roomList = Object.keys(roomsData).map(room => {
            const members = io.sockets.adapter.rooms.get(parseInt(room));
            let host;
            members.forEach(mem => {
                if(io.sockets.sockets.get(mem).positionInRoom === 1) {
                    host = clientData[mem].nickname;
                }
            });
            return {
                roomId: room,
                numOfPlayers: Array.from(members).length,
                maxPlayers: roomsData[room].maxPlayers,
                host: host
            };
        });

        client.emit('rooms', roomList);
    }

    function handleGetRoomData(data){
        const roomId = parseInt(data.roomId);
        const members = io.sockets.adapter.rooms.get(roomId);
        let players = [];
        members && members.forEach((player) => {
            players.push({
                nickname: clientData[player].nickname,
                position: io.sockets.sockets.get(player).positionInRoom,
                isReady: false,
            });
        });
        const maxNumberOfPlayers = roomsData[roomId].maxPlayers;
        client.emit("roomData", {players: players, maxNumberOfPlayers: maxNumberOfPlayers, id: roomId});
    }
});

io.listen(3001);