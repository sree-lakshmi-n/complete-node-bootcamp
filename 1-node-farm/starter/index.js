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

// function to replace template
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCT_NAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);
  if (product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, "");
  else output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};

// Read templates
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
  const { query, pathname } = url.parse(pathName, true);
  // Overview page
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const cardsHtml = dataObject
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
  } else if (pathName === "/product") {
    res.end("This is product");
  }
  // Not Found
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
