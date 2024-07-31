const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
    name:String,
    age: Number,
    address: String,
    email: String
});
const PersonModel = mongoose.model("person", personSchema)

const passportSchema = new mongoose.Schema({
    passportNumber : String,
    country: String,
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "person"
    }
});
const PassportModel = mongoose.model("passport", passportSchema)

module.exports = {PersonModel,PassportModel}