// const hello = "Hello World";
// console.log(hello);

const fs = require("fs");
const http = require("http");

/////////////////////////////////////
// FILE
// Blocking, Synchronous way
// To read a text file into a variable
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// // To output into a text file
// const textOut = `This is what we know about the avocado: ${textIn}\n Created on ${Date.now()}`;
// // Writing textOut to a new file
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("text written!");

// Non-blocking, asynchronous way
// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   console.log(data);
// });
// console.log("Will read file ...");

// Nested callback file read (Callback hell)
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("ERROR! 💥");
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       console.log(data3);

//       // Writing to a new file
//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("Your file has been written. 😇");
//       });
//     });
//   });
// });
/////////////////////////////////////

// SERVER
const server = http.createServer((req, res) => {
  console.log(req);
  res.end("Hello from the Server");
});
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
