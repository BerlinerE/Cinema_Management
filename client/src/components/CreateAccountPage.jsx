import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const CreateAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(register(userData));
      if (
        result.message === 'User registered successfully' ||
        result.message === 'Username already exists' ||
        result.message === 'Existing User'
      ) {
        if (result.message === 'User registered successfully') {
          navigate("/");
        } else {
          alert('User Already Exists');
        }
      } else {
        console.error('Account creation failed:', result.message);
      }
    } catch (error) {
      console.error('Account creation failed:', error);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  };

  const iconContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  };

  const accountIconStyle = {
    fontSize: '4rem',
    color: '#ce93d8',
    width: '100%',
    textAlign: 'center',
  };

  const pinkCircleStyle = {
    backgroundColor: 'pink',
    borderRadius: '50%',
    padding: '12px',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  };

  const buttonContainerStyle = {
    display: 'flex',
    width: '100%',
    gap: '10px',
    justifyContent: 'center',
  };

  const buttonStyle = {
    backgroundColor: '#ce93d8',
    color: 'white',
    width: '50%', 
  };

  return (
    <div style={containerStyle}>
      <div style={iconContainerStyle}>
        <div style={pinkCircleStyle}>
          <AccountCircleIcon style={accountIconStyle} />
        </div>
        <p style={{ color: 'pink', fontFamily: 'Arial, sans-serif' }}>Create Account</p>
      </div>
      <form onSubmit={handleSubmit} style={formStyle}>
        <TextField
          id="username"
          name="username"
          label="User Name"
          value={userData.username}
          onChange={handleChange}
          variant="outlined"
          required
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          value={userData.password}
          onChange={handleChange}
          variant="outlined"
          required
        />
        <TextField
          id="firstName"
          name="firstName"
          label="First Name"
          value={userData.firstName}
          onChange={handleChange}
          variant="outlined"
          required
        />
        <TextField
          id="lastName"
          name="lastName"
          label="Last Name"
          value={userData.lastName}
          onChange={handleChange}
          variant="outlined"
          required
        />
        <div style={buttonContainerStyle}>
          <Button type="submit" variant="contained" style={buttonStyle}>
            Create
          </Button>
          <Button onClick={handleCancel} variant="contained" style={buttonStyle}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;
