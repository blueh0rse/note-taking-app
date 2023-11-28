/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use("zotion");

// Insert a few documents into the users collection.
db.getCollection("users").insertMany([
  {
    username: "user1",
    password: "$2b$10$DJomDXMLGSoV1ZYmt4k1TO2lPjVHMrHeSWHBIrKff7TB8yFfLmQnm",
    email: "user1@email.com",
  },
  {
    username: "user2",
    password: "$2b$10$DJomDXMLGSoV1ZYmt4k1TO2lPjVHMrHeSWHBIrKff7TB8yFfLmQnm",
    email: "user2@email.com",
  },
  {
    username: "user3",
    password: "$2b$10$DJomDXMLGSoV1ZYmt4k1TO2lPjVHMrHeSWHBIrKff7TB8yFfLmQnm",
    email: "user3@email.com",
  },
]);

db.getCollection("notes").insertMany([
  {
    user_id: "6563c7ae9b74f32dfa059641",
    name: "user1",
    content: "This is note 1.",
  },
  {
    user_id: "6563c7ae9b74f32dfa059641",
    name: "user2",
    content: "This is note 2."
  },
  {
    user_id: "6563c7ae9b74f32dfa059641",
    name: "user3",
    password: "$2b$10$DJomDXMLGSoV1ZYmt4k1TO2lPjVHMrHeSWHBIrKff7TB8yFfLmQnm",
    email: "This is note 3.",
  },
]);
