var _ = require("underscore");

var RobotBR = function(obj) {
    this._neighbors = obj.neighbors;
    this._colorsAllowed = obj.colorsAllowed;
    this._epsilon = (obj.epsilon ? obj.epsilon : 0);
}

RobotBR.prototype.updateState = function(obj) {
    this._neighbors.find(function(d) { return d.nid == obj.nid; }).color = obj.color;
}

RobotBR.prototype.move = function() {
    var self = this;

    // Error BR
    var error = (Math.random() < self._epsilon ? true : false);
    if (error) {
        return Math.floor(Math.random() * (self._colorsAllowed - 1));
    }

    var colorCount = _.range(self._colorsAllowed).map(function(color) {
        return {
            color: color,
            count: self._neighbors.filter(function(neighbor) {
                return neighbor.color == color;
            }).length
        };
    });
    var min = _.min(colorCount, function(d) { return d.count; });
    var argmin = colorCount.filter(function(d) {
        return d.count == min.count;
    });
    var move = argmin[Math.floor(Math.random() * argmin.length)].color;
    return move;
}

module.exports = RobotBR;
