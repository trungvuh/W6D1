let MovingObject = require ('./moving_object');
let Util = require ('./utils');


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


module.exports = Asteroid;
