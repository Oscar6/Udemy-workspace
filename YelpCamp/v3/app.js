var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Launchsite  = require("./models/launchsite"),
    seedDB      = require("./seeds")
    
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

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
    Launchsite.findById(req.params.id).populate("comments").exec(function(err, foundLaunchsite){
        if(err){
            console.log(err);
        } else {
            console.log(foundLaunchsite);
            //render show template with that launchsite
            res.render("show", {launchsite: foundLaunchsite});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp is running");
});

