// Proving that we're inside wrapper function
// If arguments array isn't empty, => we're inside a function
// Since, arguments array contains all the values that are passed into a function
console.log(arguments);

// 'module' module
console.log(require("module").wrapper);

// module.exports
// Importing test-module1 (Calculator class)
const C = require("./test-module1");
// Creating an instance of Calculator class
const calc1 = new C();

console.log(calc1.add(3, 4));

// exports
// const calc2 = require("./test-module2");
// console.log(calc2.add(3, 4));
// Using ES6 destructuring
const { add, multiply, divide } = require("./test-module2");
// We can also import only the ones we want
console.log(add(3, 4));

// caching
require("./test-module3")();
require("./test-module3")();
require("./test-module3")();

// Output of caching demo:
/* 
Hello from the module!
Log this beautiful text 😁
Log this beautiful text 😁
Log this beautiful text 😁
 */
/*
'Log this beautiful text 😁' comes three times because we called the same function three times. But we have hello from the module only once.
And that is because of caching.

Technically this module was only loaded once, and so the code inside of it was also executed once only. And so that's why 'Hello from the module!' was run only once.

'Log this beautiful text 😁' came from cache, so they were stored somewhere in the Node's processes cache.

And once we called the function for the second time, it was simply retrieved from there, instead of loading the module again, 
*/
