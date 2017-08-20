var state = require('./state');

module.exports = function(socket) {
    var id = socket.id;

    var resp = state.addPlayer(id, 0);

    socket.on('disconnect', function() {
        state.removePlayer(id);
    });

    socket.emit('setup', resp);
}