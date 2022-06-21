const fs = require("fs");
// creating server
const server = require("http").createServer();

// listening to requests
server.on("request", (req, res) => {
    // We've to read a big file
  // Solution 1
  fs.readFile("test-file.txt", (err, data) => {
    if (err) console.log(err);
    res.end(data);
  });
});
