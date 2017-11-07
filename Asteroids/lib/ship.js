const Util = require('./utils');
const MovingObject = require('./moving_object');
const Bullet = require ('./bullet');

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

Ship.prototype.power = function(impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};

Ship.prototype.fireBullet = function () {
  let bullet = new Bullet ({
    pos: this.pos,
    vel: this.vel,
    game: this.game
  });
  this.game.add(bullet);
};

module.exports = Ship;
