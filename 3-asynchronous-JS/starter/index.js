const fs = require("fs");
const superagent = require("superagent");

// CALLBACK HELL
// reading dog.txt file
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   if (err) console.log(err);
//   console.log(`Breed: ${data}`);
//   // Getting a random dog image of the given breed
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) return console.log(err.message);
//       console.log(res.body.message);

//       // Writing the image link to a file
//       fs.writeFile("dog-image.txt", res.body.message, "utf-8", (err) => {
//         console.log("Random dog image saved to file!");
//       });
//     });
// });

// PROMISES
// Building promises
// read fn
const fileReadPro = (file) => {
  // Promise Constructor
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("Could not find file 😢");
      resolve(data);
    });
  });
};
// write fn
const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not find file 😢");
      resolve("Success!");
    });
  });
};

fileReadPro(`${__dirname}/dog.txt`).then((data) => {
  console.log(`Breed: ${data}`);
  // Getting a random dog image of the given breed
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log(res.body.message);

      // Writing the image link to a file
      fs.writeFile("dog-image.txt", res.body.message, "utf-8", (err) => {
        console.log("Random dog image saved to file!");
      });
    })
    .catch((err) => {
      return console.log(err.message);
    });
});
