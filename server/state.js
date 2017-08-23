var socket = require('./game');
var utils = require('./utils');

var players = {};
var games = {}

exports.addPlayer = function(id_player, id_map) {

    //default map if none selected
    if(id_map == null) {
        id_map = 0;
    }

    //if the map doesn't exists we create it
    if(games[id_map] == null) {
        games[id_map] = new Game(id_map);
    }

    players[id_player] = new Player(id_player, id_map);

    //add the player to the game
    games[id_map].addPlayer(players[id_player]);

    //return the game
    return games[id_map];
};

exports.removePlayer = function(id_player) {
    var id_map = players[id_player].getMap();
    games[id_map].removePlayer(id_player);
};


exports.movePlayer = function(id_player, to) {
    var player = players[id_player];
    var id_map = player.getMap();
    var game = games[id_map];
    
    var from = player.getPosition();

    if(game.map.isValidToMove(to)) {
        //get the path
        var sol = utils.getPathFromTo(game.map, from, to, 5, true);

        if(sol.cost > -1) {
            game.movePlayer(id_player, from, to);
            socket.movePlayer(id_player, sol.path);
        }

    }
};