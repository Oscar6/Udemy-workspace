var express = require("express");
var app = express();

// "/" => "Hi there, welcome to Pizza Legion!"
app.get("/", function(req, res){
    res.send("Hi there, welcome to Pizza Legion!");
});

// "/speak/:animal"
app.get("/speak/:animal", function(req, res){
    var sounds = {
        pig: "Bacon",
        cow: "Steak",
        dog: "Cheese",
    }
    var animal = req.params.animal.toLowerCase();
    var sound = sounds[animal];
    res.send("The " + animal + " says '" + sound + "'");
});

app.get("/repeat/:message/:times", function(req, res){
    var message = req.params.message;
    var times = Number(req.params.times);
    var result = "";
    
    for(var i = 0; i < times; i++){
        result += message + " ";
    }
    res.send(result);
});

app.get("*", function(req, res){
    res.send("You Are Not Authorized To Proceed Beyond This Page");
});

// Tell Express to listen for requests (short server)

app.listen(process.env.PORT, process.env.IP, function(argument){
  console.log("You are now running digitally");
});

