var Heap = require('heap');

exports.getRandomInt = function (min, max) {
    max += 1;
    return Math.floor(Math.random() * (max - min)) + min;
}

function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/* Pathfinding */
function heuristic(from, to) {
    var x = Math.abs(to.x - from.x);
    var y = Math.abs(to.y - from.y);

    return x + y;
}

function compareCosts(first, second) {

    //if they have the same cost, check smoother path 
    if(first.cost == second.cost) {
        return second.number_of_direction_changes - first.number_of_direction_changes;
    }

    return first.cost - second.cost;
}

function posEquals(pos_a, pos_b) {
    return pos_a.x == pos_b.x && pos_a.y == pos_b.y;
}

function getNextNode(map, to, node, increment_x, increment_y, type) {
    var previous_pos = node.path[node.path.length - 2];
    var new_pos = copy(node.path[node.path.length - 1]);
    new_pos.x = Number(new_pos.x) + increment_x;
    new_pos.y = Number(new_pos.y) + increment_y;
   
    var new_cost = Infinity;
    if((map.isValidToMove(new_pos) && type) || (!map.blocksVisibility(new_pos) && !type)) {
        new_cost = node.path.length + heuristic(new_pos, to);
    }

    var path = copy(node.path);
    path.push(new_pos);

    //check if we have changed the direction
    var num = node.number_of_direction_changes;
    if(node.path.length > 1 && Math.abs(previous_pos.x - new_pos.x) != 1) {
        num++;
    }

    return {cost : new_cost, path: path, number_of_direction_changes: num, enemy_collision: false};
}

//Algorithm A* // type -> (true) walking, (false) visibility
exports.getPathFromTo = function(map, from, to, max, type) {
    var start_point = {
        cost : heuristic(from, to), 
        path :[from],
        number_of_direction_changes : 0,
        enemy_collision : false,
    };

    var heap = new Heap(compareCosts);
    heap.push(start_point);

    while(!heap.empty()) {
        var next = heap.pop();
        // if the cost is greater than max we finish the loop also
        if(next.cost > max) break;

        //get last visited node
        var node = next.path[next.path.length - 1];

        // check if we have found the target tile
        if(posEquals(node, to)) return next;

        //add alternatives
        heap.push(getNextNode(map, to, next, 1, 0, type));
        heap.push(getNextNode(map, to, next, -1, 0, type));
        heap.push(getNextNode(map, to, next, 0, 1, type));
        heap.push(getNextNode(map, to, next, 0, -1, type));
    }

    //we return -1, meaning not path found
    return {cost : -1, path: []};
}

