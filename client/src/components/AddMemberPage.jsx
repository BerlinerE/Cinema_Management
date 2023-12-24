import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createMemberAction } from '../redux/actions/memberActions';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Grid } from '@mui/material';

function AddMemberPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    City: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createMemberAction(formData));
      navigate('../all-members');
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  const handleCancel = () => {
    navigate('../all-members');
  };

  const inputStyle = {
    color: '#ce93d8',
    marginBottom: '8px',
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
      <h1 style={headingStyle}>Add New Member</h1>
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
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            style={inputStyle}
            placeholder="Email"
          />
        </div>
        <div>
          <TextField
            type="text"
            name="City"
            value={formData.City}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            style={inputStyle}
            placeholder="City"
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
}

export default AddMemberPage;
