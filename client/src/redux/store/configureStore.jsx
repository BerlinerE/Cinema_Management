import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userReducer';
import movieReducer from '../reducers/movieReducer';
import memberReducer from '../reducers/memberReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    movie: movieReducer,
    member: memberReducer,
  },
});

export default store; 