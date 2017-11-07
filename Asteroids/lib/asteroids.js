const GameView = require('./game_view');

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "black";
  ctx.fillRect(0,0,500,500);

  let gameView = new GameView(ctx);
  // console.log(ctx);
  // console.log(canvas);
  gameView.start();

});
