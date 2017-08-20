
Game = class Game {

    constructor(sid) {
        this.map = new Map(sid);
        this.players = {};
        //id_playing = -1;
    }

    addPlayer(player, position) {
        //if no position provided then get one random position from the map
        if(position == null) {
            position = this.map.getOneRandomValidPosition();
        }

        player.setPosition(position);

        this.map.addUnit(position);
        this.players[player.id] = player;
    }

    movePlayer(id_player, from, to) {
        //check if it's a valid movement

        //if it is change player position and map position
        this.map.moveUnit(from, to);
        this.players[id_player].setPosition(to);
    }

    removePlayer(id_player) {
        this.map.deleteUnit(this.players[id_player].getPosition());
        delete this.players[id_player];
    }
}