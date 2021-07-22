const express = require("express"),
      router  = express.Router({mergeParams: true}),
      middleware = require("../middleware");

//NEW COMMENT FORM
router.get("/new", middleware.isLoggedIn,(req, res)=>{
    Campground.findById(req.params.id, (err, campground)=>{
        if(err){
            console.log(err);
        } else{
            res.render("comments/new", {campground:campground});
        }
    })
});

//POST NEW COMMENT
router.post("/", middleware.isLoggedIn, (req, res)=>{
    //find the cg with id
    Campground.findById(req.params.id, (err, campground)=>{
        if(err){
            console.log(err);
        } else{
            //get comment
            Comment.create(req.body.comments, (err, comment)=>{
                if(err){
                    console.log(err);
                }else{
                    //add username and id to comment
                    comment.author.username = req.user.username;
                    comment.author.id = req.user._id;
                    //save comment
                    comment.save();
                    //add to campground
                    campground.comments.push(comment);
                    campground.save();
                    //redirect
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
})

//Edit comment
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res)=>{
    Comment.findById(req.params.comment_id, (err, foundComment)=>{
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit",{campground_id: req.params.id, comment: foundComment});
        }
    })
});

//UPDATE COMMENT
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res)=>{
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, foundComment)=>{
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

//DELETE COMMENT
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res)=>{
    Comment.findByIdAndRemove(req.params.comment_id, (err)=>{
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/"+ req.params.id);
        }
    })
})


module.exports = router;
