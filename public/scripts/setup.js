function drawMapLines() {

    for(var point = 24; point < 30*48; point += 48) {
        //add bottom right line from point side
        drawLine(0, point*rel+1, 800, (800+point)*rel+1);

        //add bottom point line from top side
        drawLine(point, 0, 0, point*rel+1);

        //add bottom right line from top side
        drawLine(point, 0, 800 + point, 800*rel+1);
    }
}

function drawMapFloor(map) {
    console.log(map);
    for(var i in map) {
        var row = map[i];
        for(var j in row) {
            var tile = row[j];

            console.log(i,j);

            //print floor
            if(tile <= 0) {
                var render_tile = drawTile({x: i, y: j}, null, 0x818791);
                stage.addChild(render_tile);
            }
            //print obstacle (for now nothing)
            else if(tile == 1) {

            }
        }
    }
}

function addPlayer(players) {
    for(var player_key in players) {
        var player = players[player_key];

        var render_player = drawTile(player.position, null, player.color);
        render_player.zOrder = 1;
        stage.addChild(render_player);

        global_players[player_key] = render_player;
    }    
}


//Load images, init player, render the map
function setup(obj) {

    //background color
    renderer.backgroundColor = 0x000000;

    //Draw map floor
    drawMapFloor(obj.map.map);

    //Render the map
    drawMapLines();

    state = "playing";

    //init player
    addPlayer(obj.players);

    //add listeners
    renderer.plugins.interaction.on('mouseup', click);

    console.log(obj);

    update();
}