var _ = require("underscore");

var RobotBR = function(obj) {
    this._neighbors = obj.neighbors;
    this._colorsAllowed = obj.colorsAllowed;
    this._epsilon = (obj.epsilon ? obj.epsilon : 0);
}

RobotBR.prototype.updateState = function(obj) {
    // To complete, obj = { nid: 1, color: 0 }
}

RobotBR.prototype.move = function() {
    var self = this;

    // To complete
    // First, without epsilon for the random move
    // Then add epsilon error
}

module.exports = RobotBR;
