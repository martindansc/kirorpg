/** CONSTANTS */
var rel = 0.577;

var Map_h = 512;
var Map_w = 512;

var Tile = 48;
var HalfTile = 24;

/** GLOBALS */

var user_input_buffer = [];

var action_buffer = [];

var selected_cel;

var global_players = {};

var states = {
    playing : "playing"
};

var animation_queue = [];

var state;