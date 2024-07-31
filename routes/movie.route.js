const express = require("express");
const MovieModel = require("../models/movie.model")

const movieRouter = express.Router();

movieRouter.get("/get-allMovies", async(req,res)=>{
    try{
        const movies = await MovieModel.find();
        res.send({movies});
    }
    catch(error){
        res.status(400).json({msg:error.message});
    }
});
movieRouter.get("/get-Movies/:id", async(req,res)=>{
    try{
        const movie = await MovieModel.findById(req.params.id);
        if(!movie){
            return res.status(404).send();
        }
        res.send({movie});
    }
    catch(error){
        res.status(500).json({msg:error.message});
    }
});
movieRouter.get("/movies", async (req,res)=>{
    const { name, rating, q, sortBy, page = 1, limit = 10 } = req.query;
  const query = {};

  if (name) {
    query.name = new RegExp(name, 'i');
  }

  if (rating) {
    query.rating = rating;
  }

  if (q) {
    query.name = new RegExp(q, 'i');
  }

  const options = {
    sort: {},
    skip: (page - 1) * limit,
    limit: parseInt(limit),
  };

  if (sortBy) {
    options.sort[sortBy] = 1;
  }

  try {
    const movies = await movies.find(query, null, options);
    res.send(movies);
  } catch (error) {
    res.status(500).send(error);
  }
});
movieRouter.post("/create-movie", async(req,res)=>{
    const{name,genre,rating,isBoliwood} = req.body
    try{
        let movie = await MovieModel.findOne({name});
        if(movie){
            res.send({msg: "movie already exist"});
            return
        }
        let newMovie = new MovieModel({name,genre,rating,isBoliwood});
        await newMovie.save();
        res.status(200).json({msg:"Movie saved in db",newMovie});
        
    }
    catch(error){
        res.status(400).json({msg:error.message});
    }
});
module.exports = movieRouter
