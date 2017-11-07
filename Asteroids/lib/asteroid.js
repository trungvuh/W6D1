let MovingObject = require ('./moving_object');
let Util = require ('./utils');
let Ship = require ('./ship');


let Asteroid = function (options = {}) {
  MovingObject.call(this, {
    pos: options.pos,
    vel: options.vel || Util.randomVec(1),
    radius: Asteroid.RADIUS,
    color: Asteroid.COLOR,
    game: options.game
  });
};

Asteroid.COLOR = 'blue';
Asteroid.RADIUS = 20;

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.collideWith = function(otherObject) {
  if (otherObject instanceof Ship) {
    otherObject.relocate();
  }
};


module.exports = Asteroid;
