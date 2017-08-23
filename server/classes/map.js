var utils = require('./../utils');

Map = class Map {

    constructor(sid) {
        this.map = this.generateMap(sid);
    }

    getMap() {
        return this.map;
    }

    getPosition(position) {
        if(this.map[position.x][position.y] === undefined) return -1;
        return this.map[position.x][position.y];
    }

    isValidToMove(position) {
        if(this.map[position.x] === undefined) return false;
        if(this.map[position.x][position.y] === undefined) return false;

        return this.map[position.x][position.y] === 0;
    }

    blocksVisibility(position) {
        if(this.map[position.x] === undefined) return true;
        if(this.map[position.x][position.y] === undefined) return true;

        return Math.abs(this.map[position.x][position.y]) === 1;
    }
    
    generateMap(sid) {
        var map = {};
        var start_y = -3;

        for(var start_x = 6; start_x < 13; start_x++) {
            map[start_x] = {};
            for(var start_y = -3; start_y < 6; start_y++) {
                map[start_x][start_y] = 0;
            }
        }

        return map;
    }

    getOneRandomValidPosition() {
        
        //get keys
        var keys_x = Object.keys(this.map);
        var random_x = keys_x[utils.getRandomInt(0, keys_x.length - 1)];

        var keys_y = Object.keys(this.map[random_x]);
        var random_y = keys_y[utils.getRandomInt(0, keys_y.length - 1)];

        return {x : Number(random_x), y : Number(random_y)};
    }

    moveUnit(from, to) {
        //if a unit was in this position then it should be 0 another time
        this.map[from.x][from.y] = 0;

        //the to position now have a unit
        this.map[to.x][to.y] = -1;
    }

    addUnit(pos) {
        this.map[pos.x][pos.y] = -1;
    }

    deleteUnit(pos) {
        this.map[pos.x][pos.y] = 0;
    }
    
}