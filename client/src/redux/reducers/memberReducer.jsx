
const initialState = {
  members: [],
  error: null,
};

const memberReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_MEMBER_SUCCESS':
      return {
        ...state,
        members: [...state.members, action.payload], 
        error: null,
      };
    case 'CREATE_MEMBER_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    case 'FETCH_MEMBERS_SUCCESS':
      return {
        ...state,
        members: action.payload,
        error: null,
        };
    case 'FETCH_MEMBERS_FAILURE':
      return {
        ...state,
        error: action.payload,
        };
    case 'DELETE_MEMBERS_SUCCESS':
      return {
        ...state,
        members: state.members.filter((member) => member._id !== action.payload),
        error: null,
        };
    case 'DELETE_MEMBERS_FAILURE':
      return {
      ...state,
      error: action.payload,
        };
    case 'UPDATE_MEMBER_SUCCESS':
      const updatedMembers = state.members.map((member) =>
       member._id === action.payload._id ? action.payload : member
          );
      return {
         ...state,
         members: updatedMembers,
         error: null,
      };
    
     case 'UPDATE_MEMBER_FAILURE':
      return {
            ...state,
            error: action.payload,
      };
    
    default:
      return state;
  }
};

export default memberReducer;
