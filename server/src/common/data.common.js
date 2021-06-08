function ClientData(roomId, nickname, isReady) {
    this.roomId = roomId;
    this.nickname = nickname;
    this.isReady = isReady;
}

function RoomData(maxPlayers) {
    this.maxPlayers = maxPlayers;
    this.playersPositions = [
        {x:75, y:75},
        {x:600, y:75},
        {x:75, y:600},
        {x:600, y:600}
    ]
}

module.exports = {
    ClientData,
    RoomData,
}