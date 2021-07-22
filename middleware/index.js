const Campground = require("../modules/campgrounds"),
      Comment    = require("../modules/comment");

var middleware = {}

middleware.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to Login")
    res.redirect("/login")
}

middleware.checkCampgroundOwnership = function (req, res, next){
    //check if user is logged in
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, (err, foundCampground)=>{
            if(err){
                res.redirect("back");
            } else {
                if(foundCampground.author.id.equals(req.user._id)){
                    //if campground belongs to the user then next()
                    next();
                } else{
                    //otherwise redirect
                    req.flash("error","You don't have the permission")
                    res.redirect("back");
                }
            }
        });
    } else{
        //otherwise redirect
        req.flash("error", "You need to be logged In")
        res.redirect("/login");
    }
}

middleware.checkCommentOwnership = function(req, res, next){
    //check if user is logged in
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment)=>{
            if(err){
                res.redirect("back");
            } else {
                //if campground belongs to the user then next()
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else{
                    //otherwise redirect
                    req.flash("error", "You don't have the permission");
                    res.redirect("back");
                }
            }
        });
    } else{
        //otherwise redirect
        req.flash("error","You need to be logged In")
        res.redirect("/login");
    }
}

module.exports = middleware;