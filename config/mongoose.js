//require the library
const mongoose = require("mongoose");

//connect to the database
mongoose.connect("mongodb://localhost/contact_list_db");

//aquire the connection (to check if successful)
const db = mongoose.connection;

//error
db.on("error", console.error.bind(console, "error connecting to db"));

//up and running then print the message
db.once("open", function () {
    console.log("Successfully connected to database");
});
