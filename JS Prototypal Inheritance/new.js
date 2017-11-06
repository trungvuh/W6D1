Function.prototype.inherits = function(parent) {
  // Solution 1:
  // let Surrogate = function(){};
  // Surrogate.prototype = parent.prototype;
  // this.prototype = new Surrogate();
  // this.prototype.constructor = this;

  // Solution2:
  this.prototype = Object.create(parent.prototype);
  this.prototype.constructor = this;
};

let Cat = function(name) {
  this.name = name;
};
let Dog = function(name) {
  this.name = name;
};

Cat.prototype.meow = function() {
  console.log(`Meow my name is ${this.name}`);
};

Dog.inherits(Cat);




let dog = new Dog('rover');


dog.meow();
