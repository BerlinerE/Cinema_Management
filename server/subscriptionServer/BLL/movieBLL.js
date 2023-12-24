
const Movie = require('../models/Movie');
const fs = require('fs/promises'); 
const SubscriptionBLL = require('./subscriptionBLL'); 


const getAllMovies = async () => { 

    const moviesDB =  Movie.find({});
    return await moviesDB;
  };

const createMovie = async (movieData) => {
    try {
      const newMovie = new Movie(movieData);
      await newMovie.save();
      return newMovie;
    } catch (error) {
      throw error;
    }
  };

const deleteMovie = async (movieId) => {
    try {
      await SubscriptionBLL.removeMovieFromMembers(movieId);
      await Movie.findByIdAndRemove(movieId);
    } catch (error) {
      throw error;
    }
  };
  
const getMovieById = async (id) => {
    try {
      const movie = await Movie.findById(id);
      return movie;
    } catch (error) {
      throw error;
    }
  };
  
// Update a movie by ID
const updateMovieById = async (id, updatedData) => {
    try {
      const movie = await Movie.findByIdAndUpdate(id, updatedData, { new: true });
      return movie;
    } catch (error) {
      throw error;
    }
   
  };
  
  module.exports = { getAllMovies , createMovie , deleteMovie ,getMovieById , updateMovieById }