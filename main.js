var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//Game Modules Logic
var general = require('./server/general');
var game = require('./server/game');

//Include classes
require('./server/classes/player');
require('./server/classes/map');
require('./server/classes/game')

app.use(express.static('public'));

//IO
io.on('connection', function(socket){

	game.game_in(socket);
	general.general_in(socket);
	
});
game.init_out(io);
general.init_out(io);

//Server
http.listen(3000, function(){
	console.log('Kiro game is ready, listening on: 3000');
});