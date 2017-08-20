Player = class Player {

    constructor(id_player, id_map) {
        this.id = id_player;
        this.id_map = id_map;

        this.color = 0xc90606;
        this.alive = false;
        this.health = 10;
    }

    setHealth(new_health) {
        this.health = new_health;
    }

    reciveDamage(damage) {
        if(damage >= health) {
            health = 0;
            alive = false;
            return false;
        }
        else {
            this.health -= damage;
        }

        return true;
    }

    getPosition() {
        return this.position;
    }

    setPosition(pos) {
        this.position = pos;
    }

    getMap() {
        return this.id_map;
    }


  }