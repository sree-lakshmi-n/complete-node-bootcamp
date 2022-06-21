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

// Emitting an event
myEmitter.emit("newSale");
