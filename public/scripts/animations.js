
class MovementAnimation {

    constructor(player_sprite, path) {
        this.speed = 3; // tiles/second

        this.player_sprite = player_sprite;
        this.path = path;

        this.player_position = { x : Number(player_sprite.x), y : Number(player_sprite.y) };

        this.number_of_tiles = path.length - 1;

        this.number_of_frames = this.number_of_tiles * 60 / this.speed;
        this.current_frame = 0;

        this.movement_vectors = [];
        for(var i = 0; i < this.number_of_tiles; i++) {
            var pos_i = mapToScreen(this.path[i]);
            var pos_next = mapToScreen(this.path[i + 1]);
            
            var x = (pos_next.x - pos_i.x) / 60 * this.speed;
            var y = (pos_next.y - pos_i.y) / 60 * this.speed;

            this.movement_vectors.push({ x : x, y : y});
        }
        
    }

    getNextTick() {

        //if we are at the end we force the position to be the last one
        if(this.number_of_frames <= this.current_frame) {
            var pos = mapToScreen(this.path[this.number_of_tiles]);
            
            this.player_sprite.x = pos.x;
            this.player_sprite.y = pos.y;

            return true;
        }

        var current_vector_key = Math.floor(
            this.current_frame*this.number_of_tiles/this.number_of_frames);

        var current_vector = this.movement_vectors[current_vector_key];

        this.player_position.x = this.player_position.x + current_vector.x;
        this.player_position.y = this.player_position.y + current_vector.y;

        this.player_sprite.x = this.player_position.x;
        this.player_sprite.y = this.player_position.y;

        this.current_frame++;

        return false;
    }
    
}