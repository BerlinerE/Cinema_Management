import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { fetchUserPermissions } from '../redux/actions/userActions';
import {
  fetchMoviesAction,
  deleteMovieAction,
  fetchSubscriptionsForMovieAction,
} from '../redux/actions/movieActions';
import { Button, TextField, Typography, Paper } from '@mui/material';

const movieCardStyle = {
  padding: '16px',
  margin: '16px',
  backgroundColor: 'transparent',
  color: '#ce93d8',
  border: '1px solid #82b1ff',
};

const buttonStyle = {
  marginRight: '8px',
  color: '#ce93d8',
  backgroundColor: 'transparent',
  border: '1px solid #ce93d8',
  cursor: 'pointer',
  padding: '8px 16px',
  fontSize: '14px',
};

const MoviesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movies = useSelector((state) => state.movie.movies);
  const user = useSelector((state) => state.user.user);
  const userId = user && user.user ? user.user._id : '';

  const [subscriptionsForMovies, setSubscriptionsForMovies] = useState({});
  const [userPermissions, setUserPermissions] = useState({});

  useEffect(() => {
    dispatch(fetchMoviesAction());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      for (const movie of movies) {
        try {
          const membersData = await dispatch(fetchSubscriptionsForMovieAction(movie._id));
          setSubscriptionsForMovies((prev) => ({ ...prev, [movie._id]: membersData }));
        } catch (error) {
          console.error('Error fetching members:', error);
          setSubscriptionsForMovies((prev) => ({ ...prev, [movie._id]: [] }));
        }
      }
    };

    fetchData();
  }, [dispatch, movies]);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const permissions = await dispatch(fetchUserPermissions(userId));
        setUserPermissions(permissions);
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    };

    fetchPermissions();
  }, [dispatch, userId]);

  const handleDeleteMovie = (movieId) => {
    dispatch(deleteMovieAction(movieId));
    navigate('../all-movies');
  };

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const hasPermission = (permissionName) => {
    if (!userPermissions || Object.keys(userPermissions).length === 0) {
      return false;
    }

    return userPermissions.hasOwnProperty(permissionName) && userPermissions[permissionName];
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <br />

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
        <TextField
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearchInputChange}
          InputLabelProps={{ shrink: true }}
          style={{ color: '#82b1ff', marginBottom: '8px', width: '300px' }}

        />
      </div>
      {movies
        .filter((movie) => {
          const movieName = movie.Name.toLowerCase();
          return movieName.includes(searchQuery.toLowerCase());
        })
        .map((movie) => {
          const premieredDate = new Date(movie.Premiered);
          const year = premieredDate.getFullYear();
          const genresString = movie.Genres.join(', ');

          return (
            <Paper key={movie._id} elevation={3} style={movieCardStyle}>
              <div style={{ display: 'flex' ,textAlign: 'left'}}>
                <div style={{ marginRight: '14px' }}>
                  <img
                    src={movie.Image}
                    alt={`Poster for ${movie.Name}`}
                    style={{ width: '100px', height: '200px', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ flex: '1' }}>
                  <strong style={{textAlign: 'center'}}>
                    {movie.Name}, {year}
                  </strong><br/>
                  <br />
                  <em>Genres:</em> {genresString}
                  <br /> <br />
                  <strong>Subscriptions Watched:</strong><br/>
                  {subscriptionsForMovies[movie._id] ? (
                    <ul style={{ marginTop: '8px', paddingInlineStart: '16px' }}>
                      {subscriptionsForMovies[movie._id].map((member) => (
                        <li key={member._id}>
                          <Link to={`/main/subscriptions/${member.MemberId._id}`}>
                            {member.MemberId.Name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div>No subscriptions</div>
                  )}
                </div>
              </div>
              <div style={{ marginTop: '8px', textAlign: 'center' ,width: '100%'}}>
                {hasPermission('Delete Movies') && (
                  <Button
                    style={buttonStyle}
                    onClick={() => {
                      handleDeleteMovie(movie._id);
                    }}
                  >
                    Delete
                  </Button>
                )}
                <Link to={`../${movie._id}`}>
                  {hasPermission('Update Movies') && (
                    <Button style={buttonStyle}>Edit</Button>
                  )}
                </Link>
              </div>
            </Paper>
          );
        })}
    </div>
  );
};

export default MoviesPage;
