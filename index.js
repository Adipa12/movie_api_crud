const express = require("express");
const connection = require("./config/db")
const movieRouter = require("./routes/movie.route")
const {PersonModel,PassportModel} = require("./models/personPassport.model")

const server = express();
const PORT = 3030
server.use(express.json())
server.use("/movie",movieRouter)

server.get("/create-person", async (req,res)=>{
    try{
        const person = new PersonModel({
            name: "Aditya",
            age: 27,
            address: "Noida",
            email: "Adi@gmail.com"
        });
        await person.save();
        const passport = new PassportModel({
            passportNumber : "12345",
            country: "India",
            userid: person._id
        });
        await passport.save();
        res.send("Person created Successfully and Passport also created");
    }
    catch(error){
        res.status(500).json({msg: error.message});
    }
});
server.listen(PORT, async()=>{
    try{
        await connection();
        console.log(`port ${PORT} is connecting`);
    }
    catch(error){
        res.status(500).json({msg:"server is not connecting yet..."})
    }
});
