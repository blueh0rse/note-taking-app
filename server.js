"use strict";

const express = require("express");
const http = require("http");

const app = express();
const port = 3000;

app.get("/", (request, response) => {
  response.send("<h1>Hello Express!</h1>");
});

const server = http.createServer(app);

server.listen(port);
server.on("listening", onListening);

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
}
