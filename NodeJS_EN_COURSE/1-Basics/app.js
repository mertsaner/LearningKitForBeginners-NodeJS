const http = require("http");
const routes = require('./routes');
const server = http.createServer(routes.handler);
console.log(routes.someText);
//console.log(req.url, req.method, req.headers);
//console.log("We has a request!");
console.log("Server started!");
server.listen(3000);