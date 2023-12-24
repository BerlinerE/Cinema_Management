import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { subscribeToMovieAction, fetchMoviesForMembersAction } from '../redux/actions/subscriptionAction';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const MemberPanel = ({ member, setShowSubscription, watchedMovies, allMovies, setWatchedMovies }) => {
  const dispatch = useDispatch();
  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [movies, setMovies] = useState([]);
  const buttonStyle = {
    marginRight: '8px',
    color: '#ce93d8',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  useEffect(() => {
    const unwatchedMovies = allMovies && watchedMovies ? allMovies.filter(
      (movie) => !watchedMovies.find((watchedMovie) => watchedMovie._id === movie._id)
    ) : [];
    setMovies(unwatchedMovies);
  }, [watchedMovies, allMovies]);

  const handleSaveSubscription = async () => {
    if (selectedMovie && selectedDate) {
      try {
        await dispatch(subscribeToMovieAction(member._id, selectedMovie, selectedDate));
        const moviesData = await dispatch(fetchMoviesForMembersAction(member._id));
        const updatedWatchedMovies = moviesData && moviesData.movies ? moviesData.movies.movies : [];
  
        setWatchedMovies((prevWatchedMovies) => ({
          ...prevWatchedMovies,
          [member._id]: updatedWatchedMovies,
        }));
  
        setShowSubscription(false); 
      } catch (error) {
        console.error('Subscription failed:', error);
  
      }
    }
  };

  return (
    <div className="subscription-frame black-frame" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <FormControl sx={{ m: 1, width: '50%' }} size="small">
          <InputLabel id="movie-select-label">Select Movie</InputLabel>
          <Select
            labelId="movie-select-label"
            id="movie-select"
            value={selectedMovie}
            label="Select Movie"
            onChange={(e) => setSelectedMovie(e.target.value)}
          >
            <MenuItem value="">--Please choose a movie--</MenuItem>
            {movies.map((movie) => (
              <MenuItem key={movie._id} value={movie._id}>
                {movie.Name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{ ...buttonStyle, width: '50%', marginLeft: '8px' }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={handleSaveSubscription} variant="outlined" style={{ ...buttonStyle, width: '48%' }}>
          Save
        </Button>
        <Button onClick={() => setShowSubscription(false)} variant="outlined" style={{ ...buttonStyle, width: '48%' }}>
          Cancel
        </Button>
      </div>
    </div>
  );

};

export default MemberPanel;
