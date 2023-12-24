import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { fetchMembersAction, deleteMemberAction } from '../redux/actions/memberActions';
import { fetchMoviesForMembersAction, deleteSubscriptionsForMemberAction } from '../redux/actions/subscriptionAction';
import { fetchMoviesAction } from '../redux/actions/movieActions';
import { fetchUserPermissions } from '../redux/actions/userActions';
import { Button, Typography, Paper } from '@mui/material'; 

import MemberPanel from '../components/memberPanel';

const AllMembersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const members = useSelector((state) => state.member.members);
  const movies = useSelector((state) => state.movie.movies);
  const user = useSelector((state) => state.user.user);
  const userId = user && user.user ? user.user._id : '';

  const [selectedMember, setSelectedMember] = useState(null);
  const [memberMovies, setMemberMovies] = useState({});
  const [userPermissions, setUserPermissions] = useState({});

  useEffect(() => {
    dispatch(fetchMoviesAction());
    dispatch(fetchMembersAction());
  }, [dispatch]);

  useEffect(() => {
    const fetchMemberMovies = async (memberId) => {
      try {
        const moviesData = await dispatch(fetchMoviesForMembersAction(memberId));
        const movies = moviesData && moviesData.movies ? moviesData.movies.movies : [];
        setMemberMovies((prev) => ({ ...prev, [memberId]: movies }));
      } catch (error) {
        console.error('Error fetching movies:', error);
        setMemberMovies((prev) => ({ ...prev, [memberId]: [] }));
      }
    };

    members.forEach((member) => {
      fetchMemberMovies(member._id);
    });
  }, [dispatch, members]);

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
  }, [dispatch]);

  const handleDeleteMember = (memberId) => {
    dispatch(deleteMemberAction(memberId));
    dispatch(deleteSubscriptionsForMemberAction(memberId));
    navigate('../all-members');
  };

  const handleSubscribeClick = (memberId) => {
    setSelectedMember(memberId);
  };

  const paperStyle = {
    padding: '24px',
    margin: '24px',
    backgroundColor: 'transparent', 
    color: '#ce93d8', 
    border: '1px solid #82b1ff', 
  };

  const buttonStyle = {
    marginRight: '8px',
    color: '#ce93d8', 
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  

  return (
    <div style={{ fontFamily: 'Arial' }}>
      <br />
      {members.map((member) => (
        <Paper key={member._id} elevation={3} style={paperStyle}>
          <div>
            <Typography variant="h6" align="center">
              <strong>{member.Name}</strong> 
            </Typography> <br/>
            <Typography variant="subtitle1">
              <strong>Email:</strong> {member.Email}
            </Typography>
            <Typography variant="subtitle1">
              <strong>City:</strong> {member.City}
            </Typography>
            


            <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button
              style={{ ...buttonStyle, width: '100px' , display: 'flex'}} 
              onClick={() => handleDeleteMember(member._id)}
              variant="outlined"
            >
              Delete
            </Button>
            <Link to={`../${member._id}`} style={{ textDecoration: 'none' }}>
              <Button
                style={{ ...buttonStyle, width: '100px', display: 'flex' }} 
                variant="outlined"
              >
                Edit
              </Button>

            </Link>
          </div>

            <div className="movie-watched-frame" >
              <h3>Movie watched</h3>
              <ul>
                {memberMovies[member._id] && memberMovies[member._id].length > 0 ? (
                  memberMovies[member._id].map((movie) => (
                    <li key={movie._id}>
                      <Link to={`/main/movies/${movie._id}`}>
                        {movie.Name} ({new Date(movie.Premiered).getFullYear()})
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>No movies watched</li>
                )}
              </ul>
            </div>
            <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={() => handleSubscribeClick(member._id)}
              variant="outlined"
              style={buttonStyle}
            >
              Subscribe to Movie
            </Button>
          </div>
            {selectedMember === member._id && (
              <MemberPanel
                key={member._id}
                member={member}
                setShowSubscription={setSelectedMember}
                watchedMovies={memberMovies[member._id] || []}
                allMovies={movies}
                setWatchedMovies={setMemberMovies}
              />
            )}
          </div>
        </Paper>
      ))}
    </div>
  );
};

export default AllMembersPage;
