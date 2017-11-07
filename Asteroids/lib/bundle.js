/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const GameView = __webpack_require__(1);

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__ (2);

let GameView = function (ctx) {
  this.game = new Game();
  this.ctx = ctx;
  
  this.start();
};

GameView.prototype.start = function () {
  setInterval(() => {
    this.game.moveObjects();
    this.game.draw(this.ctx);
  }, 20);
};

module.exports = GameView;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Asteroid = __webpack_require__ (3);

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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

let MovingObject = __webpack_require__ (4);
let Util = __webpack_require__ (5);


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


/***/ }),
/* 4 */
/***/ (function(module, exports) {

let MovingObject = function(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
};

MovingObject.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI, false);
  ctx.fill();
};

MovingObject.prototype.move = function () {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  if(this.pos[0] < 0 || this.pos[0] > this.game.DIM_X || this.pos[1] < 0 || this.pos[1] > this.game.DIM_Y) {
    this.pos = this.game.wrap(this.pos);
  }
};

MovingObject.prototype.isCollidedWith = function (otherObject) {
  
};

module.exports = MovingObject;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

let Util = {
  inherits (child, parent) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
  },
  randomVec (length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  // Scale the length of a vector by the given amount.
  scale (vec, m) {
    return [vec[0] * m, vec[1] * m];
  }
};

module.exports = Util;


/***/ })
/******/ ]);