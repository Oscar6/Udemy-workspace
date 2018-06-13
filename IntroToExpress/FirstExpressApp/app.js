var express = require("express");
var app = express();

// "/" => "Hi there!"
app.get("/", function(req, res){
    res.send("Hi there!");
});

// "/bye" => "Goodbye!"
app.get("/bye", function(req, res){
    res.send("Goodbye!");
});

// "/dog" => "Bark!"
app.get("/dog", function(req, res){
    console.log("Someone is sneaking");
    res.send("Bark");
});

app.get("/r/:subredditName", function(req, res){
    var subreddit = req.params.subredditName;
   res.send("WELCOME TO THE " + subreddit.toUpperCase() + " SUBREDDIT!");
});

app.get("/r/:subredditName/comments/:id/:title/", function(req, res){
    console.log(req.params);
   res.send("WELCOME TO THE COMMENTS PAGE!");
});

app.get("*", function(req, res){
    res.send("You won many Lumes!");
});

// Tell Express to listen for requests (short server)

app.listen(process.env.PORT, process.env.IP, function(argument){
  console.log("Server has started");
});

