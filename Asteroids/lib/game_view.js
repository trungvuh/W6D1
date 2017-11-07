const Game = require ('./game');

let GameView = function (ctx) {
  this.game = new Game();
  this.ctx = ctx;

  this.start();
};

GameView.prototype.start = function () {
  this.bindKeyHandlers();
  setInterval(() => {
    this.game.step();
    this.game.draw(this.ctx);
  }, 20);
};

GameView.prototype.bindKeyHandlers = function () {
  key('w', () => {
    this.game.ship.power([0,-1]);
  });
  key('a', () => {
    this.game.ship.power([-1,0]);
  });
  key('d', () => {
    this.game.ship.power([1,0]);
  });
  key('s', () => {
    this.game.ship.power([0,1]);
  });
  key('space', () => {
    this.game.ship.fireBullet();
  });
};

module.exports = GameView;
