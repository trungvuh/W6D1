const MovingObject = require ('./moving_object');
const Util = require ('./utils');

let Bullet = function (options = {}) {
  MovingObject.call(this, {
    pos: options.pos,
    vel: options.vel || Util.randomVec(1),
    radius: Bullet.RADIUS,
    color: Bullet.COLOR,
    game: options.game
  });
};

Util.inherits(Bullet, MovingObject);

Bullet.COLOR = 'green';
Bullet.RADIUS = 2;




module.exports = Bullet;
