const Asteroid = require ('./asteroid');
const Ship = require ('./ship');

// const DEFAULTS = {
//   DIM_X: 500,
//   DIM_Y: 500,
//   NUM_ASTEROIDS: 4
// }

let Game = function () {
  this.asteroids = [];
  this.addAsteroids();
  this.ship = new Ship ({
    pos: this.randomPostition(),
    vel: [0,0],
    game: this
  });
};

Game.prototype.DIM_X = 500;
Game.prototype.DIM_Y = 500;
Game.prototype.NUM_ASTEROIDS = 75;

Game.prototype.addAsteroids = function () {
  for (var i = 0; i < (Math.random()*this.NUM_ASTEROIDS); i++) {
    let asteroid = new Asteroid({
      pos: this.randomPostition(),
      game: this });
    this.asteroids.push(asteroid);
  }
};

Game.prototype.randomPostition = function () {
  return [Math.random() * this.DIM_X, Math.random() * this.DIM_Y];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0,0,500,500);
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,500,500);
  this.allObjects().forEach( asteroid => {
    asteroid.draw(ctx);
  });
};

Game.prototype.moveObjects = function () {
  this.allObjects().forEach( asteroid => {
    asteroid.move();
  });
};

Game.prototype.wrap = function (pos) {
  return [this.DIM_X - pos[0], this.DIM_Y - pos[1]];
};

Game.prototype.checkCollisions = function () {
  this.allObjects().forEach( asteroid1 => {
    this.allObjects().forEach( asteroid2 => {
      if (asteroid1.isCollidedWith(asteroid2) && asteroid1 !== asteroid2) {
        asteroid1.collideWith(asteroid2);
      }
    });
  });
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function(asteroid) {
  this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
};

Game.prototype.allObjects = function () {
  return this.asteroids.concat(this.ship);
};





module.exports = Game;
