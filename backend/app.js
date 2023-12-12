"use strict";

// secret management
require("dotenv").config();

// database connection
require("./database/db_connect.js");

const cors = require("cors");
const https = require("https");
const express = require("express");
const fs = require("fs");
const rateLimit = require("express-rate-limit");
const morgan = require('morgan');
const path = require('path');
const app = express();

const cacert = fs.readFileSync("./certificates/cacert.pem");
const server_key = fs.readFileSync("./certificates/webserver.key.pem");
const server_cert = fs.readFileSync("./certificates/webserver.crt.pem");

const port = process.env.SERVER_PORT;

// CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};

// Enable CORS for all routes
app.use(cors(corsOptions));

// Rate limit
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100/min
});

// Define a stream for Morgan to write logs to (optional)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'webserver.log'), { flags: 'a' });

// Create a combined log format (you can customize this)
const logFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]';

// Use Morgan middleware to log requests to console (and optionally to a file)
app.use(morgan(logFormat, { stream: accessLogStream }));

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("OK");
});

// routes
const authRoutes = require("./routes/auth.routes.js");
const usersRoutes = require("./routes/users.routes.js");
const notesRoutes = require("./routes/notes.routes.js");
// const groupsRoutes = require("./routes/groups.routes.js");

app.use("/", limiter, authRoutes);
app.use("/users", limiter, usersRoutes);
app.use("/notes", limiter, notesRoutes);
// app.use("/groups", limiter, groupsRoutes);

const httpsOptions = {
  ca: cacert,
  key: server_key,
  cert: server_cert,
  passphrase: process.env.SERVER_PASS,
};

const server = https.createServer(httpsOptions, app);
// const server = http.createServer(app);

server.listen(port);
server.on("listening", onListening);

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind + "...");
}
