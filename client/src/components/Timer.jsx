import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getUserTimeoutSession, updateTimeoutSession } from "../redux/API/API";
import { useNavigate } from "react-router-dom";
import { clearUser } from '../redux/actions/userActions'; 
import { Typography } from '@mui/material';

const Timer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [secondsUntillTimeout, setSecondsUntillTimeout] = useState(0);
  const user = useSelector((state) => state.user.user);
  const userId = user && user.user ? user.user._id : '';

  useEffect(() => {
    const fetchTimeout = async () => {
      try {
        const { data } = await getUserTimeoutSession(userId);
        setSecondsUntillTimeout(data.timeout);
      } catch (error) {
        console.log(error)

      }
    };
    fetchTimeout();
  }, [userId]);

  useEffect(() => {
    let interval;
    if (secondsUntillTimeout >= 0) {
      interval = setInterval(() => {
        setSecondsUntillTimeout((prev) => prev - 1);
      }, 1000);
    } else {
        dispatch(clearUser());
        navigate("/");
    }

    return () => clearInterval(interval);
  }, [secondsUntillTimeout]);

  useEffect(() => {
    const updateSeconds = async () => {
      try {
        await updateTimeoutSession(userId, secondsUntillTimeout);
      } catch (error) {
        console.log(error)
      }
    };

    updateSeconds();
  }, [ secondsUntillTimeout]);



  const headingStyle = {
    fontFamily: 'Arial',
    color: '#82b1ff',
    textAlign: 'center',
  };

  return (
    <div>
         <Typography variant="h10" style={headingStyle}>

        Time remaining Until Logout:
        {Math.floor(secondsUntillTimeout / 60) !== 0
          ? `${Math.floor(secondsUntillTimeout / 60)} minutes `
          : ""}
        {secondsUntillTimeout % 60} seconds
        </Typography>

    </div>
  );
};

export default Timer;