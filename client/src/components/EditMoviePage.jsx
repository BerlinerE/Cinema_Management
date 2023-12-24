import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchMoviesAction, updateMovieAction } from '../redux/actions/movieActions';
import { Button, TextField, Grid } from '@mui/material';

const EditMovie = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movieId } = useParams();

  const movies = useSelector((state) => state.movie.movies);

  const [formData, setFormData] = useState({
    Name: '',
    Genres: '', 
    Image: '',
    Premiered: '',
  });

  useEffect(() => {
    const movie = movies.find((movie) => movie._id === movieId);

    if (movie) {
      setFormData({
        Name: movie.Name,
        Genres: movie.Genres.join(', '), 
        Image: movie.Image,
        Premiered: movie.Premiered,
      });
    }
  }, [movies, movieId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const genresArray = formData.Genres.split(',').map((genre) => genre.trim());
      const premieredDate = new Date(formData.Premiered);
      const formattedPremiered = premieredDate.toISOString().split('T')[0];

      const movieData = {
        Name: formData.Name,
        Genres: genresArray,
        Image: formData.Image,
        Premiered: formattedPremiered,
        updatedAt: new Date().toISOString(),
      };

      await dispatch(updateMovieAction(movieId, movieData));
      console.log('Movie was updated successfully.');
      await dispatch(fetchMoviesAction());

      navigate('../all-movies');
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  const handleCancel = () => {
    navigate('../all-movies');
  };

  const inputStyle = {
    color: '#ce93d8',
    marginBottom: '8px',
    width: '300px',
  };

  const headingStyle = {
    fontFamily: 'Arial',
    color: '#82b1ff',
    textAlign: 'center',
    fontSize: '18px', 

  };

  const formContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  return (
    <div style={{ fontFamily: 'Arial' }}>
      <h1 style={headingStyle}>Edit Movie</h1>
      <br />
      <form onSubmit={handleSave} style={formContainerStyle}>
        <div>
          <TextField
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            style={inputStyle}
            placeholder="Name"
          />
        </div>
        <div>
          <TextField
            type="text"
            name="Genres"
            value={formData.Genres}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            style={inputStyle}
            placeholder="Genres"
          />
        </div>
        <div>
          <TextField
            type="text"
            name="Image"
            value={formData.Image}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            style={inputStyle}
            placeholder="Image URL"
          />
        </div>
        <div>
          <TextField
            type="date"
            name="Premiered"
            value={formData.Premiered}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            style={inputStyle}
          />
        </div>
        <br />
        <Grid container spacing={1} justifyContent="center">
          <Grid item>
            <Button
              variant="outlined"
              style={{ color: '#ce93d8', width: '100%' }}
              type="submit"
            >
              Save
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              style={{ color: '#ce93d8', width: '100%' }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default EditMovie;
