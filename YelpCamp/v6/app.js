var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Launchsite  = require("./models/launchsite"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds")
    
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
   secret: "Olive is the best dog",
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});


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
          res.render("launchsites/index", {launchsites:allLaunchsites});  
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
    res.render("launchsites/new");
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
            res.render("launchsites/show", {launchsite: foundLaunchsite});
        }
    });
});


// ===============
// COMMENTS ROUTES
// ===============

app.get("/launchsites/:id/comments/new", isLoggedIn, function(req, res){
    // find launchsite by is
        Launchsite.findById(req.params.id, function(err, launchsite){
            if(err){
                console.log(err);
            } else {
                res.render("comments/new", {launchsite: launchsite});
            }
        })
});

app.post("/launchsites/:id/comments", function(req, res){
    //lookup launchsite using ID
    Launchsite.findById(req.params.id, function(err, launchsite){
        if(err){
            console.log(err);
            res.redirect("/launchsites");
        } else {
        Comment.create(req.body.comment, function(err, comment){
            if(err){
                console.log(err);
            } else {
                launchsite.comments.push(comment);
                launchsite.save();
                res.redirect('/launchsites/' + launchsite._id);
            }
        });
        }
    });
    //create new comment
    //connect new comment to launchsite
    //redirect launchsite show page
});

// =========
// AUTH ROUTES
// =========

// show register form
app.get("/register", function(req, res){
    res.render("register");
});

//handle sign up logic
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/launchsites");
        });
    });
});

// show login form
app.get("/login", function(req, res){
    res.render("login");
});

// handling login logic
app.post("/login", passport.authenticate("local",
    {
        successRedirect: "/launchsites",
        failureRedirect: "/login",
    }), function(req, res){
});

// logic route
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/launchsites");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp is running");
});

