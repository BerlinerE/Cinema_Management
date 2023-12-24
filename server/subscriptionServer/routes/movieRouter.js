const express = require('express');
const router = express.Router();
const { getAllMovies , createMovie , getMovieById , deleteMovie , updateMovieById } = require('../BLL/movieBLL');

// GET all users
router.get('/', async (req, res) => {
    try {
      const movies = await getAllMovies();
      res.json(movies);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// POST - Create a new movie
router.post('/', async (req, res) => {

    try {
    const newMovie = await createMovie(req.body);
    res.status(201).json(newMovie); 
    } catch (error) {
      console.error('Error creating a movie:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// DELETE - Delete a movie by ID
router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
      await deleteMovie(id);
      res.status(204).end(); 
    } catch (error) {
      console.error('Error deleting a movie:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
// GET - Get a movie by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const movie = await getMovieById(id);

      if (!movie) {
        res.status(404).json({ error: 'Movie not found' });
      } else {
        res.json(movie);
      }
    } catch (error) {
      console.error('Error fetching a movie by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Update a movie by ID
router.put('/:id', async (req, res) => {
    const { id: _id } = req.params;
    const { movieData } = req.body;
  
    try {
      const updatedMovie = await updateMovieById(_id, req.body);
      res.json(updatedMovie);
    } catch (error) {
      console.error('Error updating a movie:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

module.exports = router;