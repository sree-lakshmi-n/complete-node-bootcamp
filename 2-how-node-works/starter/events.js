const EventEmitter = require("events");

// Instance of EventEmitter class
const myEmitter = new EventEmitter();

// Emitting an event
myEmitter.emit("newSale");
