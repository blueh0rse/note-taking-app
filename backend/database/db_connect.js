const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_KEY)
  .then(() => console.log("Connected to database..."))
  .catch((err) => console.error("Can't connect to database :(", err));
