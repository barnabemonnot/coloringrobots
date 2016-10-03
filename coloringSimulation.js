var Robot = require("./robotLogit");
var _ = require("underscore");

var nodeNumber = 6;
var nodes = _.range(nodeNumber).map(function(d) {
    return {
        nid: d,
        color: 0
    }
});
var graph = [[0, 2], [1, 2], [2, 3], [3, 4], [3, 5]];
var robots = [];

function getNeighbors(p) {
    return graph.filter(function(d) {
        return d[0] == p || d[1] == p;
    }).map(function(d) {
        return (d[0] == p ? d[1] : d[0]);
    }).map(function(d) {
        return nodes[d];
    });
}

function collisionsInGraph() {
    return graph.filter(function(d) {
        return nodes[d[0]].color == nodes[d[1]].color;
    }).length;
}

var collisions = collisionsInGraph();

for (var i = 0; i < nodeNumber; i++) {
    robots.push({
        machine: new Robot({
            colorsAllowed: 2,
            neighbors: getNeighbors(i)
        }),
        player: i
    });
}

for (var i = 0; i < 1000; i++) {
    var robot = robots[Math.floor(Math.random() * robots.length)];
    var move = robot.machine.move();
    nodes[robot.player].color = move;
    var neighbors = getNeighbors(robot.player);
    for (var j = 0; j < neighbors.length; j++) {
        var neighbor = neighbors[j];
        var neighborRobot = robots[neighbor.nid];
        neighborRobot.machine.updateState({
            nid: robot.player,
            color: move
        });
    }
    console.log("player " + robot.player + " moved to color " + move);
    console.log("graph is now", nodes);
    if (collisionsInGraph() == 0) {
        console.log("finished!");
        break;
    }
}
