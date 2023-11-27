"use strict";

// database connexion
require("./database");
// secret management
require("dotenv").config();

const http = require("http");
const express = require("express");
const mongoose = require("mongoose");

// routes
const usersRoutes = require("./routes/user.routes.js");

// middlewares
const authMiddleware = require("./middlewares/auth.middle.js");

const app = express();
const port = 3000;

app.use(express.json());

app.use(authMiddleware);
app.use("/users", usersRoutes);

app.get("/", (req, res) => {
  response.send("<h1>Hello Express!</h1>");
});

const server = http.createServer(app);

server.listen(port);
server.on("listening", onListening);
