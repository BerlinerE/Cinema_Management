const initialState = {
  user: null,
  error: null,
  users: [],
  permissions: {},
  timeout: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case 'REGISTER_FAILURE':
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    case 'CLEAR_USER':
      return {
        ...state,
        user: null,
        error: null,
      };
    case 'FETCH_USERS_SUCCESS':
      return {
        ...state,
        users: action.payload,
        error: null,
      };
    case 'FETCH_USERS_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    case 'DELETE_USER_SUCCESS':
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
        error: null,
      };
    case 'DELETE_USER_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    case 'FETCH_USER_PERMISSIONS_SUCCESS':
      return {
        ...state,
        permissions: {
          ...state.permissions,
          [action.payload.userId]: action.payload.permissions,
        },
      };
    case 'FETCH_USER_PERMISSIONS_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    case 'UPDATE_USER_SUCCESS':
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
        error: null,
      };
    case 'UPDATE_USER_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    case 'CREATE_SUCCESS':
      return {
        ...state,
        users: [...state.users, action.payload],
        error: null,
      };
    case 'CREATE_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    case 'FETCH_TIMEOUT_SUCCESS':
      return {
        ...state,
        timeout: action.payload,
        error: null,
      };
    case 'FETCH_TIMEOUT_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    case 'UPDATE_TIMEOUT_SUCCESS':
      return state;
    case 'UPDATE_TIMEOUT_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
