const express = require("express"),
      router  = express.Router(),
      passport = require("passport");

//LANDING PAGE
router.get("/", (req, res)=>{
    res.render("landing");
});


//AUTH ROUTES
//REGISTER FORM
router.get("/register", (req, res)=>{
    res.render("register");
})

//SIGN UP
router.post("/register", (req, res)=>{
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user)=>{
        if(err){
            req.flash("error",err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res ,()=>{
            req.flash("success","Welcome to Yelp camp " + user.username);
            res.redirect("/campgrounds");
        })
    })
})

//login routes
router.get("/login", (req, res)=>{
    res.render("login");
})

router.post("/login",passport.authenticate("local",{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}),(req, res)=>{
})

//LOGOUT
router.get("/logout", (req, res)=>{
    req.logout();
    req.flash("success", "Logged you out!")
    res.redirect("/campgrounds");
})

module.exports = router;
