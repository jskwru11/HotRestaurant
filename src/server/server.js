// Create basic servernpm 
const express = require("express");
const path = require("path");

// Set up app and PORT variables to run express function, and define the port to use
const app = express();
const PORT = 3005

// Set up the express app to be able to handle data parsing, and POST functions
app.use(express.urlencoded({ extended: true}));
app.use(express.json());


// Create arrays to hold reservation and waitlist data
// New objects will be pushed in when reservations made, starting with one object
const tables = [{
name: "Kendall",
phone: "123456789",
email: "kendallsdavis@gmail.com",
ID: "KD"
}]

// Objects will be pushed into this array when reservations are made
const waitlist = [{
name: "Lesley",
phone: "987654321",
email: "lesley@gmail.com",
ID: "LP"
}]

// Create set of routes to display table and waitlist info as JSON data. Use GET function
// When user visits table page, return table data. Perform same for waitlist
app.get("/api/tables", function(req, res){
    return res.json(tables);
})

app.get("/api/waitlist", function(req, res){
    return res.json(waitlist);
})

// Set up routes for the html...
app.get("/", function(req, res){
    console.log(__dirname);
    res.sendFile(path.join(__dirname, "../../index.html"));
})

app.get("/tables", function(req, res){
    console.log(__dirname);
    res.sendFile(path.join(__dirname, "../../tables.html"));
})

app.get("/reserve", function(req, res){
    console.log(__dirname);
    res.sendFile(path.join(__dirname, "../../reserve.html"));
})

// If length of tables array is less than 5, run a app.post function to push the reservation into the tables array. 
// If length of tables array is 5 or greater, run an app.post function to push the reservation into the waitlist array.

app.post("/api/tables", function(req, res) {
    // req.body is pulling in the input of the user request from the client side code
    console.log("made it to server.js")
    const newreservation = req.body;
    console.log(newreservation);
    // If current length of tables array is less than 5, push the request, aka newreservation, to the table array on /tables
    if(tables.length < 5){
    tables.push(newreservation);
    // alert("You've successfully made a reservation!!");
    // Otherwise push the request, aka newreservation, to the waitlist array on /waitlist
    } else {
    waitlist.push(newreservation);
    // alert("Sorry all tables are full, you've been added to the waitlist!");
    }
    // ???
    res.json(newreservation);
  });


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});