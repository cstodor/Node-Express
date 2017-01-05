var express = require("express");
var bodyParser = require("body-parser"); // handles parsing requests
var path = require("path"); // simplifies file paths
var expressValidator = require('express-validator'); // validator for forms
var mongojs = require("mongojs"); // mongoJS to connect with app
var db = mongojs("myusers", ["users"]); // MongoDB database and collection name

var app = express();

// Global Variables
app.use(function (req, res, next) {
    res.locals.errors = null;
    next();
});

// EJS Template Engine Middleware
app.set("view engine", "ejs"); // specify the view engine. ejs in our case
app.set("views", path.join(__dirname, "views")); // specify the folder that we want to use for our views

// Body Parser Middleware / top-level generic (most simple)
app.use(bodyParser.json()); // handles parsing json content
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
// Set Middleware for Public folder where Static Resources will be Stored
app.use(express.static(path.join(__dirname, "public")));

// Express Validator Middleware
// In this example, the formParam value is going to get morphed into form body format useful for printing.
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split("."),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += "[" + namespace.shift() + "]";
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

// setup the route for the homepage using the get request
app.get("/", function (req, res) {
    // res.send("I am a response in the screen"); // .send method prints out message on the screen

    db.users.find(function (err, docs) {
        // docs is an array of all the documents in mycollection    
        console.log(docs);
        res.render("index", {
            title: "Users",
            users: docs
        });
    })
})

app.post("/users/add", function (req, res) {

    req.checkBody("first_name", "First Name is Required").notEmpty();
    req.checkBody("last_name", "Last Name is Required").notEmpty();
    req.checkBody("email", "Email Name is Required").notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.render("index", {
            title: "Users",
            users: users,
            errors: errors
        });
    } else {
        var newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        }
        console.log(newUser);
    }


})

// setting up the port where the application will run
app.listen(3000, function () {
    console.log("Server Successfully Started at Port 3000!");
    console.log("I am a message in the command line!");
})
