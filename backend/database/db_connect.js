const mongoose = require("mongoose");
const fs = require("fs");

// Read the TLS certificate, private key, and CA certificate
//const cert = fs.readFileSync("./certificates/mongodb.crt");
//const key = fs.readFileSync("./certificates/mongodb.key");
//const ca = fs.readFileSync("./certificates/cacert.pem");

mongoose
  .connect(process.env.DB_KEY, {
    // tls: true,
    // tlsCAFile: "./certificates/mongo.crt.pem",
  })
  .then(() => console.log("Connected to database..."))
  .catch((err) => console.error("Can't connect to database :(", err));
