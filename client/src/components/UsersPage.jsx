import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { fetchUsersAction, deleteUserAction, fetchUserPermissions } from '../redux/actions/userActions';
import { Button, TextField, Typography, Grid, Paper } from '@mui/material'; 

const AllUsersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();

  const users = useSelector((state) => state.user.users);
  const permissions = useSelector((state) => state.user.permissions);

  useEffect(() => {
    dispatch(fetchUsersAction());
  }, [dispatch]);

  useEffect(() => {
    users.forEach((user) => {
      dispatch(fetchUserPermissions(user._id))
        .then(() => {
          console.log("Fetched permissions for user:", user._id, permissions);
        })
        .catch((error) => {
          console.error(`Error fetching permissions for user ${user._id}:`, error);
        });
    });
  }, [dispatch, users]);

  const handleDeleteUser = (userId) => {
    dispatch(deleteUserAction(userId));
  };

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const cardStyle = {
    padding: '16px',
    margin: '16px',
    backgroundColor: 'transparent', 
    color: '#ce93d8', 
  };

  const buttonStyle = {
    marginRight: '8px',
    color: '#ce93d8', 
    width: '100%',
  };

  const paperStyle = {
    ...cardStyle,
    border: '1px solid #82b1ff', 
  };

  const centerAlign = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  };

  return (
    <div style={{ fontFamily: 'Arial' }}>
      <Typography variant="h3" color="#82b1ff" align="center" gutterBottom>
      </Typography><br/>
      <div style={centerAlign}>
        <TextField
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearchInputChange}
          InputLabelProps={{ shrink: true }}
          style={{ color: '#82b1ff', marginBottom: '8px', width: '300px' }}
        />
      </div>
      {users
        .filter((user) => {
          const fullName = user.FirstName + ' ' + user.LastName;
          return fullName.toLowerCase().includes(searchQuery.toLowerCase());
        })
        .map((user) => (
          <Paper key={user._id} elevation={3} style={paperStyle}>
            <div style={cardStyle}>
              <Typography variant="h6" style={{ textAlign: 'center' }}>
                <strong>{user.FirstName + ' ' + user.LastName}</strong> 
              </Typography>
              <Typography variant="subtitle1">
                <strong>Username:</strong> {user.UserName}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Session Timeout:</strong> {user.SessionTimeOut}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Created Date:</strong> {user.createdAt}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Permissions:</strong>{' '}
                {permissions[user._id]
                  ? Object.keys(permissions[user._id])
                      .filter((key) => permissions[user._id][key])
                      .join(', ')
                  : 'No Permissions'}
              </Typography>
              <div style={{ marginTop: '8px' }}>
                <Grid container spacing={1} justifyContent="center">
                  <Grid item>
                    <Button
                      style={buttonStyle}
                      onClick={() => handleDeleteUser(user._id)}
                      variant="outlined"
                    >
                      Delete
                    </Button>
                  </Grid>
                  {/* Add a Link component for editing the user */}
                  <Grid item>
                    <Link to={`../${user._id}`}>
                      <Button style={buttonStyle} variant="outlined">
                        Edit
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Paper>
        ))}
    </div>
  );
};

export default AllUsersPage;
