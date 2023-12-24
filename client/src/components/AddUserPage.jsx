import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { create, fetchUsersAction } from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
import {
  FormControlLabel,
  Checkbox,
  Button,
  TextField,
  Grid,
} from '@mui/material';

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    UserName: '',
    SessionTimeOut: '',
  });

  const [userPermissions, setUserPermissions] = useState({});

  const allPermissions = [
    'View Subscriptions',
    'Create Subscriptions',
    'Delete Subscriptions',
    'Update Subscriptions',
    'View Movies',
    'Create Movies',
    'Delete Movies',
    'Update Movies',
  ];

  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;

    if (type === 'checkbox') {
      setUserPermissions((prevUserPermissions) => ({
        ...prevUserPermissions,
        [name]: checked,
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        FirstName: formData.FirstName,
        LastName: formData.LastName,
        UserName: formData.UserName,
        SessionTimeOut: formData.SessionTimeOut,
        Password: '123456',
      };

      const permissionsData = {};
      allPermissions.forEach((permission) => {
        permissionsData[permission] = userPermissions[permission] || false;
      });

      await dispatch(create(userData, permissionsData));
      console.log('User was added successfully.');

      await dispatch(fetchUsersAction());

      navigate('../all-users');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleCancel = () => {
    navigate('/manage-users');
  };

  return (
    <div style={{ fontFamily: 'Arial' }}>
      <br />
      <form onSubmit={handleSave}>
        <div>
          <TextField
            type="text"
            name="FirstName"
            value={formData.FirstName}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            style={{ color: '#7da0b0', marginBottom: '8px' }}
            placeholder="First Name"

          />
        </div>
        <div>
          <TextField
            type="text"
            name="LastName"
            value={formData.LastName}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            style={{ color: '#7da0b0', marginBottom: '8px' }}
            placeholder="Last Name"

          />
        </div>
        <div>
          <TextField
            type="text"
            name="UserName"
            value={formData.UserName}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            style={{ color: '#7da0b0', marginBottom: '8px' }}
            placeholder="Username"

          />
        </div>
        <div>
          <TextField
            type="text"
            name="SessionTimeOut"
            value={formData.SessionTimeOut}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            style={{ color: '#7da0b0', marginBottom: '8px' }}
            placeholder="Session Timeout"
          />
        </div><br/>
        <div>
          <label style={{ color: '#82b1ff' }}>Permissions: <br /></label><br />
          {allPermissions.map((permission) => (
            <div key={permission}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={userPermissions[permission] || false}
                    onChange={handleInputChange}
                    name={permission}
                    color="primary"
                    style={{ color: '#ce93d8' }}
                  />
                }
                label={permission}
                style={{ color: '#ce93d8' }}
              />
            </div>
          ))}
        </div>
        <br />
        <Grid container spacing={1} justifyContent="center">
          <Grid item>
            <Button
              variant="outlined"
              style={{ color: '#82b1ff', width: '100%' }}
              type="submit"
            >
              Save
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              style={{ color: '#82b1ff', width: '100%' }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddUser;
