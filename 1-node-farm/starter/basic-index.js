// const hello = "Hello World";
// console.log(hello);

const fs = require("fs");
const http = require("http");
const url = require("url"); // to implement routing
// url module helps parse URL parameters and values into a nicely-formatted object

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
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);
const server = http.createServer((req, res) => {
  const pathname = req.url;
  // routing
  // OVERVIEW PAGE
  if (pathname === "/overview" || pathname === "/") res.end("This is overview");
  // PRODUCT PAGE
  else if (pathname === "/product") res.end("This is the product");
  //  API
  else if (pathname === "/api") {
    fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(data);
    });
    // res.end("api");
  }
  //////////////////////////////////////////////////////////////////
  // res.end() needs to a string as a parameter, not objects.
  // data is a string that we then transformed to object using JSON.parse. Hence, send data itself as parameter to res.end() and not productData.

  // Relative paths aren't ideal in every case. If we run at a diff directory, then ./ would mean that directory and hence this path would be faulty.
  // Better way:
  //All Node.js scripts get access to a variable called dirname, and that variable always translates to the directory in which the script that we're currently executing is located.
  // './' is where the script is running and __dirname is where the current file is located.
  // It's always a best practice to use dirname variable.
  // An exception is when requiring modules.
  // eg. const url = require('url');
  // In here, './' represents the current working directory and not the place where we're executing the script from.

  // This method of reading data everytime when user hits '/api' route is not efficient.
  // Instead, just read the file once in the beginning, and then each time someone hits this route, simply send back the data without having to read it each time that a user requested.
  // So, we have the top level code to read the file once in the beginning. The file read is performed synchronously. It would block the event loop, but since it is top level code, the read file is executed only once.
  // The code when the user hits './api' route is the one that gets executed again and again and it fetches the data from the already read file. This will be performed asynchronously.
  ////////////////////////////////////////////////////////////////////

  // NOT FOUND
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello world",
    });
    res.end("<h1>Page not found!</h1>");
    // 404 page -> http status code
    /* Since we're sending back a response, we can add status code to the response. There're multiple ways to do that. */
    // an HTTP header is basically a piece of information about the response that we are sending back.
  }
});
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
