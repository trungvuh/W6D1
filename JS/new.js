function sum() {
  let args = Array.from(arguments);
  return args.reduce((acc, el) => {
    return acc + el;
  }, 0);
}

// console.log(sum(1,2,3,4));

function sum1(...args) {
  return [...args].reduce((acc, el) => {
    return acc + el;
  }, 0);
}

// console.log(sum1(1,2,3,4));

Function.prototype.myBind1 = function (context) {
  let bindArgs = Array.from(arguments).slice(1);

  return (...callingArgs) => {
    this.apply(context, bindArgs.concat(callingArgs));
  };
};

Function.prototype.myBind = function (context, ...bindArgs) {
  return (...callingArgs) => {
    return this.apply(context, bindArgs.concat(callingArgs));
  };
};

class Cat {
  constructor(name) {
    this.name = name;
  }

  says(sound, person) {
    console.log(`${this.name} says ${sound} to ${person}!`);
    return true;
  }
}
//
// const markov = new Cat("Markov");
// const breakfast = new Cat("Breakfast");
//
// const notMarkovSays = markov.says.myBind(breakfast);
// markov.says("meow", "Ned");
// markov.says.myBind(breakfast, "meow")("Markov");
// notMarkovSays("meow", "me");

function curriedSum(numArgs) {
  let numbers = [];

  function _curriedSum(n) {
    numbers.push(n);
    if(numbers.length === numArgs) {
      return numbers.reduce(function(acc, el) {
        return acc + el;
      }, 0);
    } else {
      return _curriedSum;
    }
  }

  return _curriedSum;
}
//
// const s = curriedSum(4);
// console.log(s(5)(30)(20)(1)); // => 56


Function.prototype.curry = function(numArgs) {
  var args = [];

  let _curry = (arg) => {
    args.push(arg);
    if(args.length === numArgs) {
      //return this.apply(this, args);
      return this(...args);
    } else {
      return _curry;
    }
  };

  return _curry;
};

function sumThree(num1, num2, num3) {
  return num1 + num2 + num3;
}
let f1 = sumThree.curry(3); // tells `f1` to wait until 3 arguments are given before running `sumThree`
f1 = f1(4); // [Function]
f1 = f1(20); // [Function]
f1 = f1(6); // = 30
console.log(sumThree.curry(3)(4)(20)(6));
