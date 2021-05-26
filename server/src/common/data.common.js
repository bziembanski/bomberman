function ClientData(roomId, nickname, isReady) {
    this.roomId = roomId;
    this.nickname = nickname;
    this.isReady = isReady;
}

function RoomData(maxPlayers) {
    this.maxPlayers = maxPlayers;
}

module.exports = {
    ClientData,
    RoomData,
}