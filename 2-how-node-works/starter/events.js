const EventEmitter = require("events");
const http = require("http");

// To use observer pattern in real life, it recommended to use classes that inherit from the EventEmitter class.
class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

// Instance of EventEmitter class
// const myEmitter = new EventEmitter();
const myEmitter = new Sales();

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

/////////////////////////////////////////

// Creating a server
const server = http.createServer();

// listening to an event
server.on("request", (req, res) => {
  console.log("Request received!");
  console.log(req.url);
  res.end("Request Received!");
});
server.on("request", (req, res) => {
  console.log("Another Request 😁");
});
server.on("close", (req, res) => {
  console.log("Server Closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests...");
});
