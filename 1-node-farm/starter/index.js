const fs = require("fs");
const http = require("http");
const url = require("url");

// Each time there is a new request for this route, the first thing to do
// is to read the template overview.
// Since templates will always be the same, you can actually read them to memory right in the beginning when we start the application.

// And then, when necessary, we replace the contents in there. There's no need to read the templates each time there is a request.
