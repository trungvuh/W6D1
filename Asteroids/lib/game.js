const Asteroid = require ('./asteroid');

let Game = function () {
  this.asteroids = [];
  this.addAsteroids();
};

Game.DIM_X = 500;
Game.DIM_Y = 500;
Game.NUM_ASTEROIDS = 100;

Game.prototype.addAsteroids = function () {
  for (var i = 0; i < (Math.random()*Game.NUM_ASTEROIDS); i++) {
    let asteroid = new Asteroid({
      pos: this.randomPostition(),
      game: this });
    this.asteroids.push(asteroid);
  }
};

Game.prototype.randomPostition = function () {
  return [Math.random() * Game.DIM_X, Math.random() * Game.DIM_Y];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0,0,500,500);
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,500,500);
  this.asteroids.forEach( asteroid => {
    asteroid.draw(ctx);
  });
};

Game.prototype.moveObjects = function () {
  this.asteroids.forEach( asteroid => {
    asteroid.move();
  });
};

Game.prototype.wrap = function (pos) {
  return [Game.DIM_X - pos[0], Game.DIM_Y - pos[1]];
};






module.exports = Game;
