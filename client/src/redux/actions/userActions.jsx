

import { 
  loginUser, 
  registerUser, 
  fetchUsers, 
  fetchPermissionsForUser, 
  deleteUser, 
  updateUser,
  createUser,
  getUserTimeoutSession,
  updateTimeoutSession
} from '../API/API';


export const login = (userData) => async (dispatch) => {
  try {
    const user = await loginUser(userData);
    dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    return user;
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data.error });
    throw error;
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    const user = await registerUser(userData);
    dispatch({ type: 'REGISTER_SUCCESS', payload: user });
    return user;
  } catch (error) {
    const errorMessage = error.response ? error.response.data.error : 'Unknown error';
    dispatch({ type: 'REGISTER_FAILURE', payload: errorMessage });
    throw error;
  }
};


export const clearUser = () => {
  return { type: 'CLEAR_USER' };
};

export const fetchUsersAction = () => async (dispatch) => {

  try {
    const users = await fetchUsers();
    dispatch({ type: 'FETCH_USERS_SUCCESS', payload: users });
  } catch (error) {
    const errorMessage = error.response ? error.response.data.error : 'Network error';
    dispatch({ type: 'FETCH_USERS_FAILURE', payload: errorMessage });
  }
};

export const deleteUserAction = (userId) => async (dispatch) => {
  try {
    await deleteUser(userId);
    dispatch({ type: 'DELETE_USER_SUCCESS', payload: userId });
  } catch (error) {
    dispatch({ type: 'DELETE_USER_FAILURE', payload: error });
  }
};


export const fetchUserPermissions = (userId) => async (dispatch) => {
  try {

    const response = await fetchPermissionsForUser(userId);
    const permissions = response.permissions; 
    const permissionsObject = {};
    permissions.forEach((permission) => {
      permissionsObject[permission.name] = permission.checked;
    });
    dispatch({ type: 'FETCH_USER_PERMISSIONS_SUCCESS', payload: { userId, permissions: permissionsObject } });
    return permissionsObject; 

  } catch (error) {
    dispatch({ type: 'FETCH_USER_PERMISSIONS_FAILURE', payload: error.message });
  }
};

export const updateUserAction = (userId, userData, permissionsData) => async (dispatch) => {
  try {
    const requestData = {};
    if (userData) {
      requestData.updatedUserData = userData;
    }

    if (permissionsData) {
      requestData.updatedPermissions = permissionsData;
    }
    const updatedData = await updateUser(userId, requestData);
    dispatch({ type: 'UPDATE_USER_SUCCESS', payload: updatedData });
    return updatedData;
  } catch (error) {
    dispatch({ type: 'UPDATE_USER_FAILURE', payload: error.message });
    throw error;
  }
};

export const addUserAction = ( userData, permissionsData) => async (dispatch) => {
  try {
    const requestData = {};
    if (userData) {
      requestData.userData = userData;
    }
    if (permissionsData) {
      requestData.permissionsData = permissionsData;
    }
    const creatData = await createUser(requestData);
    dispatch({ type: 'REGISTER_SUCCESS', payload: creatData });
    return creatData;
  } catch (error) {
    dispatch({ type: 'RREGISTE_FAILURE', payload: error.message });
    throw error;
  }}

export const create = (userData, permissionsData) => async (dispatch) => {
    try {
      const requestData = {};
      requestData.userData = userData;
      requestData.permissionsData = permissionsData;

      const creatData = await createUser(requestData);
      dispatch({ type: 'CREATE_SUCCESS', payload: creatData });
      return creatData;
    } catch (error) {
      const errorMessage = error.response ? error.response.data.error : 'Unknown error';
      dispatch({ type: 'CREATE_FAILURE', payload: errorMessage });
      throw error;
    }
  };


export const fetchUserTimeout = (userId) => async (dispatch) => {
  try {
    const timeout = await getUserTimeoutSession(userId);
    dispatch({ type: 'FETCH_TIMEOUT_SUCCESS', payload: timeout });
  } catch (error) {
    dispatch({ type: 'FETCH_TIMEOUT_FAILURE', payload: error.message });
  }
};

export const updateUserTimeout = (userId, updatedSeconds) => async (dispatch) => {
  try {
    await updateTimeoutSession(userId, updatedSeconds);
    dispatch({ type: 'UPDATE_TIMEOUT_SUCCESS' });
  } catch (error) {
    dispatch({ type: 'UPDATE_TIMEOUT_FAILURE', payload: error.message });
  }
};
