const Game = require ('./game');

let GameView = function (ctx) {
  this.game = new Game();
  this.ctx = ctx;

  this.start();
};

GameView.prototype.start = function () {
  setInterval(() => {
    this.game.step();
    this.game.draw(this.ctx);
  }, 20);
};

module.exports = GameView;
