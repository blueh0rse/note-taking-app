"use strict";

// secret management
require("dotenv").config();

// database connection
require("./database/db_connect.js");

const cors = require("cors");
const http = require("http");
const express = require("express");
const app = express();

const port = process.env.SERVER_PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(201).send("OK");
});

// // middlewares
// const authMiddleware = require("./middlewares/auth.middle.js");
// app.use(authMiddleware);

// routes
const usersRoutes = require("./routes/users.routes.js");
const notesRoutes = require("./routes/notes.routes.js");
const groupsRoutes = require("./routes/groups.routes.js");
app.use("/users", usersRoutes);
app.use("/notes", notesRoutes);
app.use("/groups", groupsRoutes);

const server = http.createServer(app);

server.listen(port);
server.on("listening", onListening);

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind + "...");
}
