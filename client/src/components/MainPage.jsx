import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser, fetchUserPermissions } from '../redux/actions/userActions';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import SentimentVerySatisfiedTwoToneIcon from '@mui/icons-material/SentimentVerySatisfiedTwoTone';


const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const userId = user && user.user ? user.user._id : '';

  const [selectedButton, setSelectedButton] = useState(null);
  const [userPermissions, setUserPermissions] = useState({});

  const userName = user && user.user ? user.user.UserName : '';
  const isAdmin = user && user.user ? user.user.isAdmin || false : false;

  const handleButtonClick = (path) => {
    navigate(path);
    setSelectedButton(path);
  };

  const hasPermission = (permissionName) => {
    if (!userPermissions || Object.keys(userPermissions).length === 0) {
      return false;
    }
    return userPermissions.hasOwnProperty(permissionName) && userPermissions[permissionName];
  };

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/');
  };

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
  }, [dispatch, user]);

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

  const selectedButtonStyle = {
    backgroundColor: 'yellow',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <br/>  <br/><br/>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
  <p style={{ color: '#ce93d8', fontFamily: 'Arial, sans-serif' }}>Welcome</p>
  <SentimentVerySatisfiedTwoToneIcon style={{ fontSize: '5rem', color: '#ce93d8' }} />
  <p style={{ color: '#ce93d8', fontFamily: 'Arial, sans-serif' }}>{userName}</p>
</div>

      <br/>
      <div style={buttonGroupStyle}>
        <ButtonGroup variant="text" aria-label="text button group">
          {hasPermission('View Movies') && (
            <Button
              onClick={() => handleButtonClick('movies')}
              style={{
                ...buttonStyle,
                ...{ backgroundColor: selectedButton === 'movies' ? 'yellow' : '' },
              }}
            >
              Movies
            </Button>
          )}
          {hasPermission('View Subscriptions') && (
            <Button
              onClick={() => handleButtonClick('subscriptions')}
              style={{
                ...buttonStyle,
                ...{ backgroundColor: selectedButton === 'subscriptions' ? 'yellow' : '' },
              }}
            >
              Subscriptions
            </Button>
          )}
          {isAdmin && (
            <Button
              onClick={() => handleButtonClick('manage-users')}
              style={{
                ...buttonStyle,
                ...{ backgroundColor: selectedButton === 'manage-users' ? 'yellow' : '' },
              }}
            >
              Users Management
            </Button>
          )}
          <Button
            onClick={() => handleLogout()}
            style={{
              ...buttonStyle,
              ...{ backgroundColor: selectedButton === 'logout' ? 'yellow' : '' },
            }}
          >
            Logout
          </Button>
        </ButtonGroup>
      </div>
      <Outlet />
    </div>
  );
};

export default MainPage;
