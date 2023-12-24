import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions/userActions';
import { useNavigate, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await dispatch(login(formData));
      if (user) {
        console.log('Login successful BHV');
        navigate('/main');
      } else {
        setErrorMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred during login. Please try again later.');
    }
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

  const loginIconStyle = {
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

  const linkStyle = {
    color: 'black', 
    textDecoration: 'none', 
    fontFamily: 'Arial, sans-serif', 
    cursor: 'pointer',
  };

  const loginButtonStyle = {
    backgroundColor: '#ce93d8',
    color: 'white',
    width: '100%', 
    marginTop: '20px',
  };

  return (
    <div style={containerStyle}>
      <div style={iconContainerStyle}>
        <div style={pinkCircleStyle}>
          <LoginIcon style={loginIconStyle} />
        </div>
        <p style={{ color: 'pink', fontFamily: 'Arial, sans-serif' }}>Sign in</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            id="username"
            name="username"
            label="Username"
            value={formData.username}
            onChange={handleChange}
            variant="outlined"
            required
          />
        </div>
        <br />
        <div>
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            required
          />
        </div>
        <br />
        <div>
          <Button type="submit" variant="contained" style={loginButtonStyle}>
            Login
          </Button>
        </div>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <p style={linkStyle}>
        New User? <Link to="/create-account" style={linkStyle}>Create an Account</Link>
      </p>
    </div>
  );
};

export default LoginPage;
