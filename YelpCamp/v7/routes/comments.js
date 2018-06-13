var express     = require("express");
var router      = express.Router({mergeParams: true});
var Launchsite  = require("../models/launchsite")
var Comment     = require("../models/comment")

// COMMENTS NEW
router.get("/new", isLoggedIn, function(req, res){
    // find launchsite by is
        console.log(req.params.id);
        Launchsite.findById(req.params.id, function(err, launchsite){
            if(err){
                console.log(err);
            } else {
                res.render("comments/new", {launchsite: launchsite});
            }
        })
});

// COMMENTS CREATE
router.post("/",isLoggedIn, function(req, res){
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
});

// MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;