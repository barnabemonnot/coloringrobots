var _ = require("underscore");

var RobotLogit = function(obj) {
    this._neighbors = obj.neighbors;
    this._colorsAllowed = obj.colorsAllowed;
    this._beta = (obj.beta ? obj.beta : 1);
}

RobotLogit.prototype.updateState = function(obj) {
    this._neighbors.find(function(d) { return d.nid == obj.nid; }).color = obj.color;
}

RobotLogit.prototype.move = function() {
    var self = this;
    var costs = _.range(self._colorsAllowed).map(function(color) {
        return {
            color: color,
            count: self._neighbors.filter(function(neighbor) {
                return neighbor.color == color;
            }).length
        };
    });
    var total = 0;
    costs.forEach(function(d) {
        var weight = Math.exp(-self._beta * d.count);
        d.weight = weight;
        total += weight;
        d.cumulative = total;
    });

    var pt = Math.random() * total;
    var move = costs.find(function(d) {
        return d.cumulative >= pt;
    });
    return move.color;
}

module.exports = RobotLogit;
