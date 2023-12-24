import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPermissions } from '../redux/actions/userActions';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const ManageUsersPage = () => {
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
      padding: '10px',
      cursor: 'pointer',
      textAlign: 'left',
      border: 'none',
      outline: 'none',
    };
  };

  const hasCreateSubscriptionPermission = () => {
    return userPermissions && userPermissions['Create Subscriptions'];
  };

  const buttonGroupStyle = {
    display: 'flex',
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
            onClick={() => handleButtonClick('all-members')}
            style={{...buttonStyle,
              ...{backgroundColor: getButtonStyle('all-members')}}}
          >
            All Members
          </Button>
          {hasCreateSubscriptionPermission() && (
            <Button
              onClick={() => handleButtonClick('add-member')}
              style={{ ...buttonStyle,
                ...{backgroundColor: getButtonStyle('add-member').backgroundColor }}}
            >
              Add Member
            </Button>
          )}
        </ButtonGroup>
      </div>
      <Outlet />
    </div>
  );
};

export default ManageUsersPage;
