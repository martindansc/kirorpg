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

        console.log(next);

        var player_sprite = global_players[next.id_player];

        switch(next.action) {
            case "movePlayer":
                var animation = new MovementAnimation(player_sprite, next.path);
                animation_queue.push(animation);
                break;
            case "":
                break;
            default:

        }
    }
}

function runAnimation() {
    if(animation_queue.length > 0) {
        //get the first element
        var animation = animation_queue[0];

        var finished = animation.getNextTick();

        //if we finish we delete this animation and let the next start
        if(finished) {
            animation_queue.shift();
        }
    }
}

function update() {

    handleUserClicks();

    //if we need to do any action
    handleActions();

    requestAnimationFrame(update);

    runAnimation();

    //set the stage
    renderer.render(stage);
}
