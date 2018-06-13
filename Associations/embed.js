var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo")

// POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String,
});
// Model
var Post = mongoose.model("Post", postSchema);

// USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
var User = mongoose.model("User", userSchema);

// var newUser = new User({
//     email: "potter@hogwarts.edu",
//     name: "Harry Potter"
// });

// newUser.posts.push({
//     title: "How to brew polyjuice potion",
//     content: "Unfortunately, you must attend class to learn command"
// });

// newUser.save(function(err, user){
//   if(err){
//       console.log(err);
//   } else {
//       console.log(user);
//   }
// });

// var newPost = new Post({
//     title: "Reflections on Apple",
//     content: "They are delicious"
// });

// newPost.save(function(err, post){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });

User.findOne({name: "Harry Potter"}, function(err, user){
    if(err){
        // console.log(err);
    } else {
        user.posts.push({
            title: "How Dobby saved my life",
            content: "Dobby is a legend"
        });
        user.save(function(err, user){
            if(err){
                console.log(err);
            } else {
                console.log(user);
            }
        });
    }
});