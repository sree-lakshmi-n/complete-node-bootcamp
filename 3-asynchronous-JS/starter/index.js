const fs = require("fs");

// reading dog.txt file
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  if (err) console.log(err);
  console.log(`Breed: ${data}`);
});
