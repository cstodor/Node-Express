var express = require("express");
var bodyParser = require("body-parser"); // handles parsing requests
var path = require("path"); // simplifies file paths

var app = express();

// EJS Template Engine Middleware
app.set('view engine', 'ejs'); // specify the view engine. ejs in our case
app.set('views', path.join(__dirname, 'views')); // specify the folder that we want to use for our views

// Body Parser Middleware / top-level generic (most simple)
app.use(bodyParser.json()); // handles parsing json content
app.use(bodyParser.urlencoded({extended: false})); // parse application/x-www-form-urlencoded
// Set Middleware for Public folder where Static Resources will be Stored
app.use(express.static(path.join(__dirname, "public")));

// setup the route for the homepage using the get request
app.get("/", function (req, res) {
    // res.send("I am a response in the screen"); // .send method prints out message on the screen
    res.render('index', {
        title: 'Example Title'
    });
})

// setting up the port where the application will run
app.listen(3000, function () {
    console.log("Server Successfully Started at Port 3000!");
    console.log("I am a message in the command line!");
})
