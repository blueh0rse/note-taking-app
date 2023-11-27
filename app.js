"use strict";

// database connexion
require("./database/database.js");
// secret management
require("dotenv").config();

const cors = require("cors");
const http = require("http");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// routes
const usersRoutes = require("./routes/user.routes.js");
app.use("/users", usersRoutes);

// middlewares
const authMiddleware = require("./middlewares/auth.middle.js");
app.use(authMiddleware);

app.get("/", (req, res) => {
  response.send("<h1>Hello Express!</h1>");
});

const server = http.createServer(app);

server.listen(port);
server.on("listening", onListening);
