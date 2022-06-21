const EventEmitter = require("events");

// Instance of EventEmitter class
const myEmitter = new EventEmitter();

// Listening to an event - Observer Pattern
myEmitter.on("newSale", () => {
  console.log("There was a new event!");
});

// Multiple listeners for the same event
myEmitter.on("newSale", () => {
  console.log("Customer name: Jane");
});

// using passed arguments
myEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} items left in stock.`);
});

// Emitting an event
// passing arguments
myEmitter.emit("newSale", 9);
