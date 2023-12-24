const initialState = {
  movies: [],
  error: null,
  subscriptionsForMovie: [],
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MOVIES_SUCCESS':
      return {
        ...state,
        movies: action.payload,
        error: null,
      };
    case 'FETCH_MOVIES_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    case 'DELETE_MOVIES_SUCCESS':
      return {
        ...state,
        movies: state.movies.filter((movie) => movie._id !== action.payload),
        error: null,
      };
    case 'DELETE_MOVIES_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    case 'CREATE_MOVIE_SUCCESS':
      return {
        ...state,
        movies: [...state.movies, action.payload],
        error: null,
      };
    case 'CREATE_MOVIE_FAILURE':
      return {
        ...state,
        error: action.payload,
      };

    case 'UPDATE_MOVIE_SUCCESS':
      return {
        ...state,
        movies: state.movies.map((movie) =>
        movie._id === action.payload._id ? action.payload : movie   
               ),
        error: null,
        };
   case 'UPDATE_MOVIE_FAILURE':
        return {
          ...state,
          error: action.payload,
        };
   case 'FETCH_SUBSCRIPTION_FOR_MOVIE_SUCCESS':
        return {
          ...state,
          subscriptionsForMovie: action.payload,
          error: null,
        };
   case 'FETCH_SUBSCRIPTION_FOR_MOVIE_FAILURE':
       return {
        ...state,
        error: action.payload,
         };
    default:
      return state;
  }
};

export default movieReducer;
