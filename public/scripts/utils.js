//Input: x,y of a tile
//Output: x,y pixels of the screen of the top vertex of the tile
function mapToScreen(tile) {
    var x = Number(tile.x);
    var y = Number(tile.y);
    return { x: (x - y + 1) * 24, y: (x + y) * 24 * rel };
}

//Input: x,y pixels of the screen
function screenToMap(point) {
    var x = Number(point.x);
    var y = Number(point.y);

    return {x: Math.floor(((point.x)/ 24 - 1 + (point.y / (24 *rel)))/2),
         y: Math.floor(((point.y / (24*rel)) - (point.x - 24) / 24)/2)};
}

//set player position
function setPlayerPosition(id_player, position) {
    var screen_position = mapToScreen(position);
    global_players[id_player].x = screen_position.x;
    global_players[id_player].y = screen_position.y;
}

//Check if it the tile is in the map
function checkIfValidTile(tile) {
    if(tile.x < 0 || tile.x > 512 || tile.y < 0 || tile.y > 512) 
        return false;

    return true;
}

function drawTile(tile, line_color, background_color) {

    var screen_position = mapToScreen(tile);

    var draw = new PIXI.Graphics();
    draw.beginFill(background_color);

    if(line_color !== null)
        draw.lineStyle(1, line_color, 1);
    
    draw.drawPolygon([
        0, 0,             
        24, 24*rel,              
        0, 48*rel,
        -24,24*rel,
        0, 0   
    ]);

    draw.pivot.set(0,0);
    
    //Fill shape's color
    draw.endFill();
    
    draw.x = screen_position.x;
    draw.y = screen_position.y;

    return draw;
}

//Draws a white line from x1,y1 to x2,y2
function drawLine(x1,y1,x2,y2 ) {
    var line = new PIXI.Graphics();
    line.lineStyle(1, 0xFFFFFF, 1);
    line.moveTo(x1, y1);
    line.lineTo(x2, y2);
    stage.addChild(line);
}

function click(e) {
    mousePosition = renderer.plugins.interaction.mouse.global
    //only accept the input if the state is equals to playing
    if(state === "playing" && checkIfValidTile(mousePosition))
        user_input_buffer.push(screenToMap(mousePosition));
}