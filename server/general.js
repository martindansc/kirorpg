var state = require('./state');

var io;

module.exports.general_in = function(socket) {
    var id = socket.id;

    var resp = state.addPlayer(id, 0);

    socket.on('disconnect', function() {
        state.removePlayer(id);
    });

    socket.emit('setup', resp);
}

module.exports.init_out = function(new_io) {
    new_io = io;
}