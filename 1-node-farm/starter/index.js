const fs = require("fs");
const http = require("http");
const url = require("url");

// Each time there is a new request for this route, the first thing to do
// is to read the template overview.
// Since templates will always be the same, you can actually read them to memory right in the beginning when we start the application.

// And then, when necessary, we replace the contents in there. There's no need to read the templates each time there is a request.
/////////////////////////////////////////////////////////////////////////

// To replace placeholder with actual cards.
// In dataObject, we have an array of all the objects that are in data.JSON.
//  We have to loop through this array, and for each of them, replace the placeholders in the template with the actual data from the current product.

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

// Read data file
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);

// Server
const server = http.createServer((req, res) => {
  const pathName = req.url;

  // Overview page
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const cardsHtml = dataObject.map((el) => replaceTemplate(tempCard, el));

    res.end(tempOverview);
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
