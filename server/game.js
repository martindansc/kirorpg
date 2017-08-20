var state = require('./state');

var io;

/* IN  */

module.exports.game_in = function(socket) {

    var id = socket.id;

    socket.on('movePlayer', function(to) {
        state.movePlayer(id, to);
    });
}

/* OUT */

module.exports.init_out = function(new_io) {
    io = new_io;
}

module.exports.movePlayer = function(id_player, from, to) {
    var obj = {
        action : "movePlayer",
        id_player : id_player,
        from : from,
        to : to
    };

    io.emit('action', obj);
}