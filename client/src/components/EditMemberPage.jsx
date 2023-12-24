import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateMemberAction, fetchMembersAction } from '../redux/actions/memberActions';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, TextField, Grid } from '@mui/material';

const EditMemberPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { memberId } = useParams();

  const members = useSelector((state) => state.member.members);
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    City: '',
  });

  useEffect(() => {
    if (!members || !members.length) {
      dispatch(fetchMembersAction());
    } else {
      const member = members.find((member) => member._id === memberId);
      if (member) {
        setFormData({
          Name: member.Name || '',
          Email: member.Email || '',
          City: member.City || '',
        });
      }
    }
  }, [dispatch, memberId, members]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const memberData = {
        Name: formData.Name,
        Email: formData.Email,
        City: formData.City,
        updatedAt: new Date().toISOString(),
      };

      await dispatch(updateMemberAction(memberId, memberData));
      console.log('Member was updated successfully.');
      await dispatch(fetchMembersAction());

      navigate('../all-members');
    } catch (error) {
      console.error('Error updating member:', error);
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
    <div>
      <h1 style={headingStyle}>Edit Member</h1>
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
            type="text"
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
};

export default EditMemberPage;
