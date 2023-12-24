import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPermissions } from '../redux/actions/userActions';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const ManageMoviesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const userId = user && user.user ? user.user._id : '';

  const [selectedButton, setSelectedButton] = useState(null);
  const [userPermissions, setUserPermissions] = useState({});

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

  const handleButtonClick = (path) => {
    navigate(path);
    setSelectedButton(path);
  };

  const getButtonStyle = (buttonPath) => {
    return {
      backgroundColor: selectedButton === buttonPath ? 'yellow' : '',
      color: '#ce93d8',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: 'transparent',
      padding: '10px',
      cursor: 'pointer',
      textAlign: 'left',
      border: 'none',
      outline: 'none',
    };
  };

  const hasCreateMoviePermission = () => {
    return userPermissions && userPermissions['Create Movies'];
  };

  const buttonGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  };

  const buttonStyle = {
    color: '#ce93d8',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'transparent',
    padding: '10px',
    cursor: 'pointer',
    textAlign: 'left',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <br />
      <div className="button-container" style={buttonGroupStyle}>
        <ButtonGroup variant="text" aria-label="text button group">
          <Button
            onClick={() => handleButtonClick('all-movies')}
            style={{
              ...buttonStyle,
              ...{ backgroundColor: getButtonStyle('all-movies').backgroundColor },
            }}
          >
            All Movies
          </Button>
          {hasCreateMoviePermission() && (
            <Button
              onClick={() => handleButtonClick('add-movie')}
              style={{
                ...buttonStyle,
                ...{ backgroundColor: getButtonStyle('add-movie').backgroundColor },
              }}
            >
              Add Movie
            </Button>
          )}
        </ButtonGroup>
      </div>
      <Outlet />
    </div>
  );
};

export default ManageMoviesPage;
