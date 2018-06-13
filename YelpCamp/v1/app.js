var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var launchsite = [
        {name: "NASA", image: "https://www.nasa.gov/sites/all/themes/custom/nasatwo/images/nasa-logo.svg"},
        {name: "SpaceX", image: "https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/042015/spacerx-logo_0.png?itok=SshEXNNF"},
        {name: "Tesla", image: "https://electrek.files.wordpress.com/2016/06/tesla-model-x-promo-shot-3-2.jpg?quality=82&strip=all&w=290&h=145&crop=1"},
    ];

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/launchsite", function(req, res){
    res.render("launchsite", {launchsite: launchsite});
});

app.post("/launchsite", function(req, res){
    // get data from form and add to launchsite array
    var name = req.body.name;
    var image = req.body.image;
    var newLaunchsite = {name: name, image: image}
    launchsite.push(newLaunchsite);
    // redirect back to launchsite page
    res.redirect("/launchsite");
});

app.get("/launchsite/new", function(req,res){
    res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp is running");
});

