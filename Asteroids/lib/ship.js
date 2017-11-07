const Util = require('./utils');
const MovingObject = require('./moving_object');

let Ship = function(options = {}) {
  MovingObject.call(this, {
    pos: options.pos,
    vel: options.vel,
    radius: Ship.RADIUS,
    color: Ship.COLOR,
    game: options.game
  });
};

Ship.COLOR = 'red';
Ship.RADIUS = 10;

Util.inherits(Ship, MovingObject);


Ship.prototype.relocate = function () {
  this.pos = this.game.randomPostition();
  this.vel = [0,0];
};

module.exports = Ship;
