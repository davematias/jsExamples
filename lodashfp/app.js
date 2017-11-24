//intro to functional programming
//https://simonsmith.io/dipping-a-toe-into-functional-js-with-lodash-fp/

const map = require('lodash/fp/map');

//implicit function
const squareAll = map(num => num * num);

squareAll([1, 2, 3, 4]); // [1, 4, 9, 16]

//currying

const curry = require('lodash/fp/curry');

const greet = curry((greeting, name) => `${greeting}, ${name}!`);

// Passing both arguments allows the function to work as normal
greet('Hello', 'Simon'); // Hello, Simon!

// Passing fewer however, returns another function
const sayBye = greet('See ya');

// And once it receives all its arguments, it returns a value
sayBye('John'); // See ya, John!;

//composition of functions

const flow = require('lodash/fp/flow');
const escape = require('lodash/fp/escape');
const trim = require('lodash/fp/trim');

const sanitise = flow(escape, trim);

sanitise('    <html>    '); // <html>

console.log("all done");