const fs = require("fs");
const superagent = require("superagent");

// reading dog.txt file
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  if (err) console.log(err);
  console.log(`Breed: ${data}`);
  // Getting a random dog image of the given breed
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      if (err) return console.log(err.message);
      console.log(res.body.message);

      // Writing the image link to a file
      fs.writeFile("dog-image.txt", res.body.message, "utf-8", (err) => {
        console.log("Random dog image saved to file!");
      });
    });
});
