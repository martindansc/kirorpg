function handleUserClicks(tileMousePosition) {

    //user select cell
    var mousePosition = renderer.plugins.interaction.mouse.global;
    var tileMousePosition = screenToMap(mousePosition);

    //print orange if valid move
    stage.removeChild(selected_cel);
    selected_cel = drawTile(tileMousePosition, null, 0xFF3300);
    if(selected_cel !== null) {
        stage.addChild(selected_cel);
    }

    while(user_input_buffer.length > 0) {
        var next = user_input_buffer.shift();
        socket.emit("movePlayer", tileMousePosition);
    }
}

function handleActions() {

    while(action_buffer.length > 0) {
        var next = action_buffer.shift();

        switch(next.action) {
            case "movePlayer":
                setPlayerPosition(next.id_player, next.to);
                break;
            case "":
                break;
            default:

        }
    }
}

function update() {

    handleUserClicks();

    //if we need to do any action
    handleActions();

    requestAnimationFrame(update);

    //set the stage
    renderer.render(stage);
}
