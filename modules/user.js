const mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");
const { model } = require("./comment");

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);