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
      if (err) reject("Couldn't find that file 😢");
      resolve(data);
    });
  });
};
// write fn
const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not find that file 😢");
      resolve("Success!");
    });
  });
};

// Chained Promises
// fileReadPro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);
//     // Getting a random dog image of the given breed
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);

//     // Writing the image link to a file
//     return writeFilePro("dog-image.txt", res.body.message);
//   })
//   .then(() => {
//     console.log("Random dog image saved to file!");
//   })
//   // One catch() for all the promises
//   .catch((err) => {
//     return console.log(err.message);
//   });

// Async/ Await
const getDogPic = async () => {
  try {
    const data = await fileReadPro(`${__dirname}/dogg.txt`);
    console.log(`Breed: ${data}`);
    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);
    await writeFilePro("dog-image.txt", res.body.message);
    console.log("Random dog image saved to file!");
  } catch (err) {
    console.log(err);
  }
};
getDogPic();
