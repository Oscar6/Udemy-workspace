var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var wizards = ["Dobby", "Harry", "Ron", "Hermione"];

app.get("/", function(req, res){
    res.render("home");
});

app.post("/addwizard", function(req, res){
    var newWizard = req.body.newwizard;
    wizards.push(newWizard);
    res.redirect("/wizards");
});

app.get("/wizards", function(req, res){
    res.render("wizards", {wizards: wizards});
});

app.listen(process.env.PORT, process.env.IP, function(argument){
    console.log("Server is working. Cool...");
});
