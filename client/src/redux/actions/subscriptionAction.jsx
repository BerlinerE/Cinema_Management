import { 
  fetchSubscriptions, 
  fetchMoviesPerMember, 
  subscribeToMovie,
  deleteSubscriptionsForMember
} from '../API/API';


export const fetchSubscriptionsAction = () => async (dispatch) => {
    try {
      const response = await fetchSubscriptions(); 
      const subscriptions = response.data;
      dispatch({type: 'FETCH_SUBSCRIPTIONS_SUCCESS', payload: subscriptions});
    } catch (error) {
      dispatch({type: 'FETCH_SUBSCRIPTIONS_FAILURE',payload: error,});
    }
  };


  export const fetchMoviesForMembersAction = (memberId) => async (dispatch) => {
    try {
      const movies = await fetchMoviesPerMember(memberId);  
      dispatch({ type: 'FETCH_MOVIES_FOR_MEMBER_SUCCESS', payload: { memberId, movies } });
      return { memberId, movies };
    } catch (error) {
      const errorMessage = error.response ? error.response.data.error : 'Network error';
      dispatch({ type: 'FETCH_MOVIES_FOR_MEMBER_FAILURE', payload: errorMessage});
        throw error;
    }
  };
  

  export const subscribeToMovieAction = (memberId, movieId, date) => async (dispatch) => {
    try {
      const subscription = await subscribeToMovie(memberId, movieId, date);
      dispatch({type: 'SUBSCRIBE_TO_MOVIE_SUCCESS',payload: subscription});
      return subscription;
    } catch (error) {
      dispatch({type: 'SUBSCRIBE_TO_MOVIE_FAILURE',payload: error});
      throw error;
    }
  };


export const deleteSubscriptionsForMemberAction = (member_Id) => async (dispatch) => {
  try {
    await deleteSubscriptionsForMember(member_Id); 
    dispatch({type: 'DELETE_SUBSCRIPTIONS_FOR_MEMBER_SUCCESS', payload: member_Id});
  } catch (error) {
    dispatch({type: 'DELETE_SUBSCRIPTIONS_FOR_MEMBER_FAILURE',payload: error});
  }
};