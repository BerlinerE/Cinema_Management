const initialState = {
  subscriptions: [],
  memberMovies: {},
  error: null,
};

const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_SUBSCRIPTIONS_SUCCESS':
      return {
        ...state,
        subscriptions: action.payload,
        error: null,
      };
    case 'FETCH_SUBSCRIPTIONS_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    case 'FETCH_MOVIES_FOR_MEMBER_SUCCESS':
      return {
        ...state,
        memberMovies: {
          ...state.memberMovies,
          [action.payload.memberId]: action.payload.movies,
        },
        error: null,
      };
    case 'FETCH_MOVIES_FOR_MEMBER_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    case 'SUBSCRIBE_TO_MOVIE_SUCCESS':
      const { memberId, movieId, date } = action.payload;
      const updatedMoviesForMember = {
        ...state.memberMovies[memberId],
        movieId,
        date
      };

      return {
        ...state,
        memberMovies: {
          ...state.memberMovies,
          [memberId]: updatedMoviesForMember,
        },
        error: null, 
      };
    case 'SUBSCRIBE_TO_MOVIE_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    case 'DELETE_SUBSCRIPTIONS_FOR_MEMBER_SUCCESS':
        const { member_Id } = action.payload;
        const { [member_Id]: removedMember, ...restMemberMovies } = state.memberMovies;
      
      return {
          ...state,
          memberMovies: restMemberMovies,
          error: null,
        };
    case 'DELETE_SUBSCRIPTIONS_FOR_MEMBER_FAILURE':
        return {
          ...state,
          error: action.payload,
        };
      
    default:
      return state;
  }
};

export default subscriptionReducer;
