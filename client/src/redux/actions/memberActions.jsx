import { 
  createMember, 
  fetchMembers, 
  deletehMember,
  updateMember
} from '../API/API';

export const createMemberAction = (memberData) => async (dispatch) => {
  try {
      const newMember = await createMember(memberData);
      dispatch({ type: 'CREATE_MEMBER_SUCCESS', payload: newMember });
      return newMember;
    } catch (error) {
      const errorMessage = error.response ? error.response.data.error : 'Unknown error';
      dispatch({ type: 'CREATE_MEMBER_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  
export const fetchMembersAction = () => async (dispatch) => {
   try {
    const members = await fetchMembers();
    dispatch({ type: 'FETCH_MEMBERS_SUCCESS', payload: members });
    } catch (error) {
    const errorMessage = error.response ? error.response.data.error : 'Network error';
    dispatch({ type: 'FETCH_MEMBERS_FAILURE', payload: errorMessage });
    }
  };

export const deleteMemberAction = (memberId) => async (dispatch) => {
  try {
    await deletehMember(memberId);
    dispatch({ type: 'DELETE_MEMBERS_SUCCESS', payload: memberId });
    } catch (error) {
      const serializableError = {
        message: error.message,
        name: error.name,
        code: error.code,
      };
      
    dispatch({ type: 'DELETE_MEMBERS_FAILURE', payload: serializableError });
    }
  };
  
export const updateMemberAction = (memberId, updatedData) => async (dispatch) => {
  try {
      const updatedMember = await updateMember(memberId, updatedData);
      dispatch({ type: 'UPDATE_MEMBER_SUCCESS', payload: updatedMember });
      return updatedMember;
    } catch (error) {
      const errorMessage = error.response ? error.response.data.error : 'Unknown error';
      dispatch({ type: 'UPDATE_MEMBER_FAILURE', payload: errorMessage });

      throw error;
    }
  };