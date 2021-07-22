const express = require("express"),
      router  = express.Router(),
      middeware = require("../middleware");

//INDEX PAGE
router.get("/", (req, res)=>{
    //get all campgrounds from the db
    Campground.find({}, (err, allCg)=>{
        if (err){
            console.log(err);
        } else{
            res.render("campgrounds/index", {campgrounds: allCg})
        }
    });
});

//ADD NEW CAMPGROUND
router.post("/", middeware.isLoggedIn, (req, res)=>{
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {id: req.user._id, username: req.user.username};
    var newCampground = {name: name,price:price, image: image, description: desc, author: author};
    //add campgrund to the db and redirect
    Campground.create(newCampground, (err, newCg)=>{
        if(err){
            console.log(err);
        } else{
            res.redirect("/campgrounds");
        }
    });
});

//NEW CAMPGROUND FORM
router.get("/new",middeware.isLoggedIn, (req, res)=>{
    res.render("campgrounds/new");
});

//SHOW 
router.get("/:id", (req, res)=>{
    //show cg with given id
    Campground.findById(req.params.id).populate("comments").exec((err, foundCg)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/show", {campground: foundCg});
        }
    });
});

//EDIT CAMPGROUND
router.get("/:id/edit",middeware.checkCampgroundOwnership,(req, res)=>{
    Campground.findById(req.params.id, (err, foundCampground)=>{
        if(err){
            res.redirect("/campgrounds");
        } else{
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    })
})

//UPDATE CAMPGROUND
router.put("/:id", middeware.checkCampgroundOwnership,(req, res)=>{
    //find campground with id and update
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground)=>{
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

//DESTROY CAMPGROUND
router.delete("/:id",middeware.checkCampgroundOwnership, (req, res)=>{
    Campground.findByIdAndRemove(req.params.id, (err, deletedCampground)=>{
        if(err){
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds");
        }
    })
})

module.exports = router;