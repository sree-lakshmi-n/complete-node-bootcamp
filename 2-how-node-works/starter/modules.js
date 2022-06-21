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
const calc2 = require("./test-module2");
console.log(calc2.add(3, 4));
