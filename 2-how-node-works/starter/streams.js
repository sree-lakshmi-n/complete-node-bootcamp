const fs = require("fs");
// creating server
const server = require("http").createServer();

// listening to requests
server.on("request", (req, res) => {
  // We've to read a big file
  // Solution 1 - Not apt for bigger projects/ productions
  //   fs.readFile("test-file.txt", (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //
  ////////////////////////////
  // Solution 2 - Streams
  //We don't need data variable. Instead of reading the data into a variable, and having to store that variable into memory, we will just create a readable stream.
  // Then as we receive each chunk of data, we send it to the client as a response which is a writable stream.
  const readable = fs.createReadStream("test-file.txt");
  //Each time there is a new piece of data that we can consume, a readable stream emits the data event.
  readable.on("data", (chunk) => {
    res.write(chunk);
  });
  readable.on("end", () => {
    res.end();
  });
  readable.on("error", (err) => {
    console.log(err);
    res.statusCode = 500;
    res.end("File not found");
  });
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests...");
});
