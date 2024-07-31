const mongoose = require("mongoose");
const dotenv = require('dotenv').config()
// const url ="mongodb://127.0.0.1:27017/movie_store"

const url = process.env.MONGO_URL

const connection = ()=>{
    try{
        mongoose.connect(url)
        console.log("mongodb connection done");
    }
    catch(error){
        res.send("Error in database connection or mongodb");
    }
};
module.exports = connection