const http = require("http");
//require express
const express = require("express");
//require mongoose
const db = require("./config/mongoose");
const Contact = require("./models/contact");
//use express to simply js code
const app = express();
//set up ejs engine user to write js code in html
app.set("view engine", "ejs");
app.listen(5000);
//use static file styles.css it will look in public folder
app.use(express.static("public"));
//urlencoded middleware to access form data sent at/create-contact
app.use(express.urlencoded());

var contactList = [
    {
        name: "Tony Starck",
        phone: "123455666",
    },
    {
        name: "Hellow word",
        phone: "343434534534",
    },
];

app.get("/", (req, res) => {
    //passing variables to the index.js
    Contact.find({}, function (err, contacts) {
        if (err) {
            console.log("error in fecthing contacts from db");
            return;
        }
        res.render("index", {
            title: "Contacts List",
            contact_list: contacts,
        });
    });
});
app.get("/about", (req, res) => {
    res.render("404");
});
app.post("/create-contact", (req, res) => {
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone,
    // });
    Contact.create(
        {
            name: req.body.name,
            phone: req.body.phone,
        },
        function (err, newContact) {
            if (err) {
                console.log("error creating Contact");
                return;
            }
            console.log("*****", newContact);
            return res.redirect("back");
        }
    );
    // return res.redirect("back");
});

//for deleting contacts
app.get("/delete-contact", (req, res) => {
    //get the id from query in the url
    let id = req.query.id;
    //find the contact in database using id and delete
    Contact.findByIdAndDelete(id, function (err) {
        if (err) {
            console.log("error deleting contact from database");
            return;
        }
        return res.redirect("back");
    });
});
