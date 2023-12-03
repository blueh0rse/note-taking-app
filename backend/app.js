"use strict";

// secret management
require("dotenv").config();

// database connection
require("./database/db_connect.js");

const cors = require("cors");
// const http = require("http");
const https = require('https');
const express = require("express");
const app = express();
const fs = require('fs');

const cacert = fs.readFileSync('./certificates/cacert.pem');
const server_key = fs.readFileSync('./certificates/webserver.key.pem');
const server_cert = fs.readFileSync('./certificates/webserver.crt.pem');

const port = process.env.SERVER_PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(201).send("OK");
});

// // middlewares
// const authMiddleware = require("./middlewares/auth.js");
// app.use(authMiddleware);

// routes
const authRoutes = require("./routes/auth.routes.js")
const usersRoutes = require("./routes/users.routes.js");
const notesRoutes = require("./routes/notes.routes.js");
const groupsRoutes = require("./routes/groups.routes.js");

app.use("/", authRoutes);
app.use("/users", usersRoutes);
app.use("/notes", notesRoutes);
app.use("/groups", groupsRoutes);

const httpsOptions = {
  ca: cacert,
  key: server_key,
  cert: server_cert,
  passphrase: process.env.SERVER_PASS
};

const server = https.createServer(httpsOptions, app);

server.listen(port);
server.on("listening", onListening);

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind + "...");
}
