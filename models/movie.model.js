const mongoose = require("mongoose");
const { version } = require("os");

const MovieSchema = mongoose.Schema({
    name: {type: String, require: true},
    genre: String,
    rating: Number,
    isBoliwood: Boolean
},{
    versionKey: false
});
const MovieModel = mongoose.model("Indian", MovieSchema);

module.exports = MovieModel

