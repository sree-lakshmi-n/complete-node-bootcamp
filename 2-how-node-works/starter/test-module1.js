// USING CLASS DECLARATION
// class Calculator {
//   add(a, b) {
//     return a + b;
//   }
//   multiply(a, b) {
//     return a * b;
//   }
//   divide(a, b) {
//     return a / b;
//   }
// }

// Exporting Calculator class
// module.exports = Calculator;

// USING CLASS EXPRESSION
module.exports = class {
  add(a, b) {
    return a + b;
  }
  multiply(a, b) {
    return a * b;
  }
  divide(a, b) {
    return a / b;
  }
};
