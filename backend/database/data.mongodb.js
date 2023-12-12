// Add users to selected db

// Select the database to use.
use("db");

// read and write in non-system collections
db.createUser({
  user: "user",
  pwd: "",
  roles: ["readWrite"]
})

// perform administrative tasks
db.createUser({
  user: "admin",
  pwd: "",
  roles: ["dbAdmin"]
})
