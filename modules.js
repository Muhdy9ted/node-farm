console.log(arguments)
console.log(require('module').wrapper);

const Cal = require('./test-module1');

const calc1 = new Cal();
console.log(calc1.add(2,5))

const calc2 = require('./test-module2')
console.log(calc2.add(5,4))

const { add, multiply, divide } = require('./test-module2')
console.log(multiply(2,4))

//caching
require('./test-module3')();
require('./test-module3')();
require('./test-module3')();