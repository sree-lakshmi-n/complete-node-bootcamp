const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();
// Configuring threadpool size
process.env.UV_THREADPOOL_SIZE = 2;

setTimeout(() => {
  console.log("Timer 1 finished");
}, 0);
setImmediate(() => {
  console.log("Immediate 1 finished");
});

fs.readFile("text-file.txt", () => {
  console.log("I/O finished");
  setTimeout(() => {
    console.log("Timer 2 finished");
  }, 0);
  setTimeout(() => {
    console.log("Timer 3 finished");
  }, 3000);
  setImmediate(() => {
    console.log("Immediate 2 finished");
  });

  process.nextTick(() => {
    console.log("Process.nextTick()");
  });

  // Default threadpool size = 4
  //   crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
  //     console.log(Date.now() - start, "Password encrypted");
  //   });
  //   crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
  //     console.log(Date.now() - start, "Password encrypted");
  //   });
  //   crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
  //     console.log(Date.now() - start, "Password encrypted");
  //   });
  //   crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
  //     console.log(Date.now() - start, "Password encrypted");
  //   });
  // Sync methods - Blocks event loop
  crypto.pbkdf2Sync("password", "salt", 10000, 1024, "sha512");
  console.log(Date.now() - start, "Password encrypted");
  crypto.pbkdf2Sync("password", "salt", 10000, 1024, "sha512");
  console.log(Date.now() - start, "Password encrypted");
  crypto.pbkdf2Sync("password", "salt", 10000, 1024, "sha512");
  console.log(Date.now() - start, "Password encrypted");
});
console.log("Hello from the top level code");
