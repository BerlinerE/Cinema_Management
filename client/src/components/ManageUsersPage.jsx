import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const ManageUsersPage = () => {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (path) => {
    navigate(path);
    setSelectedButton(path);
  };

  const getButtonStyle = (buttonPath) => {
    return {
      backgroundColor: selectedButton === buttonPath ? 'yellow' : '',
    };
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
            onClick={() => handleButtonClick('all-users')}
            style={{
              ...buttonStyle,
              ...{ backgroundColor: getButtonStyle('all-users').backgroundColor },
            }}
          >
            All Users
          </Button>
          <Button
            onClick={() => handleButtonClick('add-user')}
            style={{
              ...buttonStyle,
              ...{ backgroundColor: getButtonStyle('add-user').backgroundColor },
            }}
          >
            Add User
          </Button>
        </ButtonGroup>
      </div>
      <Outlet />
    </div>
  );
};

export default ManageUsersPage;
