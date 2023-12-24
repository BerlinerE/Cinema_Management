import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAction } from '../redux/actions/userActions';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Checkbox, FormControlLabel, TextField, Grid } from '@mui/material';

const EditUserPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const permissions = useSelector((state) => state.user.permissions);
  const { userId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    UserName: '',
    SessionTimeOut: '',
    CreatedDate: '',
  });

  const [allPermissions, setAllPermissions] = useState([
    'View Subscriptions',
    'Create Subscriptions',
    'Delete Subscriptions',
    'Update Subscriptions',
    'View Movies',
    'Create Movies',
    'Delete Movies',
    'Update Movies',
  ]);

  const [userPermissions, setUserPermissions] = useState({});

  useEffect(() => {
    const selectedUser = users.find((user) => user._id === userId);

    if (selectedUser) {
      setFormData({
        FirstName: selectedUser.FirstName,
        LastName: selectedUser.LastName,
        UserName: selectedUser.UserName,
        SessionTimeOut: selectedUser.SessionTimeOut,
        CreatedDate: selectedUser.createdAt,
      });

      const userPermissionsData = permissions[userId] || {};

      const initialUserPermissions = {};
      allPermissions.forEach((permission) => {
        initialUserPermissions[permission] = Boolean(userPermissionsData[permission]);
      });

      setUserPermissions(initialUserPermissions);
    }
  }, [userId, users, permissions, allPermissions]);

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
        CreatedDate: formData.CreatedDate,
      };

      const permissionsData = {};
      allPermissions.forEach((permission) => {
        permissionsData[permission] = userPermissions[permission] || false;
      });

      const updatedUser = await dispatch(updateUserAction(userId, userData, permissionsData));
      console.log('Updated userID:', userId);
      console.log('Updated user:', userData);
      console.log('Updated userPER:', permissionsData);

      navigate('../all-users');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleCancel = () => {
    navigate('/all-users');
  };

  const inputStyle = {
    color: '#7da0b0',
    marginBottom: '8px',
    width: '300px',
  };

  const permissionsStyle = {
    color: '#ce93d8',
  };

  return (
    <div style={{ fontFamily: 'Arial' }}>
      <h2 style={{ fontFamily: 'Arial', color: '#82b1ff', textAlign: 'center' }}>
        Edit User: {formData.UserName}
      </h2>
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div>
          <TextField
            type="text"
            name="FirstName"
            value={formData.FirstName}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            style={inputStyle}
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
            style={inputStyle}
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
            style={inputStyle}
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
            style={inputStyle}
            placeholder="Session Timeout"
          />
        </div>
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
                style={permissionsStyle}
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

export default EditUserPage;
