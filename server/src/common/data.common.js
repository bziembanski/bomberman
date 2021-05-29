function ClientData(roomId, nickname, isReady) {
    this.roomId = roomId;
    this.nickname = nickname;
    this.isReady = isReady;
}

function RoomData(maxPlayers) {
    this.maxPlayers = maxPlayers;
    this.playersPostions = Array(4);
}

module.exports = {
    ClientData,
    RoomData,
}