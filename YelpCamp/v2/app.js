var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SET UP
var launchsiteSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Launchsite = mongoose.model("Launchsite", launchsiteSchema);
    
    // Launchsite.create(
    //     {
    //         name: "SpaceX: South Texas Launch Site", 
    //         image: "http://www.spacex.com/sites/spacex/files/styles/launch_site-small/public/spacex_launch_site_tx.jpg?itok=7SM9yHmv",
    //         description: "SpaceX is building the world’s first commercial launch site designed for orbital missions in the Boca Chica area of South Texas."
            
    //     }, 
    //     function(err, launchsite){
    //         if(err){
    //             console.log(err);
    //         } else {
    //             console.log("Newly created Launchsite: ");
    //             console.log(launchsite);
    //         }
    //     });


app.get("/", function(req, res){
    res.render("landing");
});

//INDEX - show all launchsites
app.get("/launchsites", function(req, res){
    //Get all launchsites from DB
    Launchsite.find({}, function(err, allLaunchsites){
        if(err){
            console.log(err);
        } else {
          res.render("index", {launchsites:allLaunchsites});  
        }
    });
});

//CREATE - add new launchsite to DataBase
app.post("/launchsites", function(req, res){
    // get data from form and add to launchsite array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newLaunchsite = {name: name, image: image, description: desc}
    //Create a new launchsite and save to DB
    Launchsite.create(newLaunchsite, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            // redirect back to launchsite page
            res.redirect("/launchsites");
        }
    });
});

//NEW - show form to create new launchsite
app.get("/launchsites/new", function(req,res){
    res.render("new.ejs");
});

// SHOW - shows more info about one launchsite
app.get("/launchsites/:id", function(req, res){
    //find the launchsite with provided ID
    Launchsite.findById(req.params.id, function(err, foundLaunchsite){
        if(err){
            console.log(err);
        } else {
            //render show template with that launchsite
            res.render("show", {launchsite: foundLaunchsite});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp is running");
});

