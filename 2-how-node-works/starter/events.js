const EventEmitter = require("events");

// Instance of EventEmitter class
const myEmitter = new EventEmitter();

// Listening to an event
myEmitter.on("newSale", () => {
  console.log("There was a new event!");
});

// Emitting an event
myEmitter.emit("newSale");
