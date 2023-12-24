import {
  fetchMovies,
  deletehMovie,
  createMovie,
  updateMovie,
  fetchSubscriptionsForMovie,
} from '../API/API';


export const fetchMoviesAction = () => async (dispatch) => {
    try {
      const movies = await fetchMovies();
      dispatch({ type: 'FETCH_MOVIES_SUCCESS', payload: movies });
    } catch (error) {
        const errorMessage = error.response ? error.response.data.error : 'Network error';
      dispatch({ type: 'FETCH_MOVIES_FAILURE', payload: errorMessage });
    }
  };

export const deleteMovieAction = (movieId) => async (dispatch) => {
    try {
      await deletehMovie(movieId);
      dispatch({ type: 'DELETE_MOVIES_SUCCESS', payload: movieId });
    } catch (error) {
      const serializableError = {
        message: error.message,
        name: error.name,
        code: error.code,
      };
      
      dispatch({ type: 'DELETE_MOVIES_FAILURE', payload: serializableError });
    }
  };

export const createMovieAction = (movieData) => async (dispatch) => {
    try {
      const creatData = await createMovie(movieData);
      dispatch({ type: 'CREATE_MOVIE_SUCCESS', payload: creatData });
      return creatData;
    } catch (error) {
      const errorMessage = error.response ? error.response.data.error : 'Unknown error';
      dispatch({ type: 'CREATE_MOVIE_FAILURE', payload: errorMessage });
      throw error;
    }
  };
  
export const updateMovieAction = (movieId, movieData) => async (dispatch) => {
  try {
    const updatedData = await updateMovie(movieId, movieData);
    dispatch({ type: 'UPDATE_MOVIE_SUCCESS', payload: updatedData });
    return updatedData;
  } catch (error) {
    dispatch({ type: 'UPDATE_MOVIE_FAILURE', payload: error.message });
    throw error;
  }}

export const fetchSubscriptionsForMovieAction = (movieId) => async (dispatch) => {
    try {
      const subscriptionsForMovie = await fetchSubscriptionsForMovie(movieId);
      if (!subscriptionsForMovie) {
        console.error('No subscriptions found for movie:', movieId);
        return;
      }
      dispatch({ type: 'FETCH_SUBSCRIPTION_FOR_MOVIE_SUCCESS', payload: subscriptionsForMovie });
      return subscriptionsForMovie;
    } catch (error) {
      const errorMessage = error.response ? error.response.data.error : 'Network error';
      console.error('Error fetching subscriptions:', errorMessage);
      throw error;
    }
  };