const express       = require("express"),
      app           = express(),
      bodyParser    = require("body-parser"),
      mongoose      = require("mongoose"),
      flash         = require("connect-flash"),
      passport      = require("passport"),
      localStratergy= require("passport-local") 
      Campground    = require("./modules/campgrounds"),
      Comment       = require("./modules/comment"),
      User          = require("./modules/user"),
      seedDb        = require("./seed"),
      methodOverride= require("method-override"),
      port = process.env.port || 3000;

const campgroundRoutes = require("./routes/campground"),
      commentRoutes = require("./routes/comment"),
      indexRoutes = require("./routes/index");

// seedDb();
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost/yelp_camp",{ useNewUrlParser: true , useUnifiedTopology: true } );
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(flash());

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Some secret message",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next)=>{
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

app.use("/",indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(port, (req, res) =>{
    console.log("Server started");
});
