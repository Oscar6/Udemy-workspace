var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

//adding a new cat to the DB

// var georgie = new Cat({
//     name: "Dobby",
//     age: "110",
//     temperament: "Nice"
// });

// georgie.save(function(err, cat){
//     if(err){
//         console.log("Something broke")
//     } else {
//         console.log("Cat has been saved to DB:")
//         console.log(cat);
//     }
// });

Cat.create({
    name: "Snow White",
    age: 15,
    temperament: "Bland"
}, function(err, cat){
    if(err){
        console.log(err);
    } else {
        console.log(cat);
    }
});

//retrieve all cats from the DB and console.log each one
Cat.find({}, function(err, cats){
    if(err){
        console.log("Yay, error.");
        console.log(err);
    } else {
        console.log("All the cats...");
        console.log(cats);
    }
});