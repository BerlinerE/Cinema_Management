import axios from 'axios';

const CINEMA_BASE_URL = 'http://localhost:8001/';
const SUBSCRIPTION_BASE_URL = 'http://localhost:8000/';


const API_URLS = {
  login: `${CINEMA_BASE_URL}auth/login`,
  register: `${CINEMA_BASE_URL}auth/register`, 
  users: `${CINEMA_BASE_URL}users`, 
  permissions: (userId) => `${CINEMA_BASE_URL}users/${userId}/permissions`,
  movies: `${SUBSCRIPTION_BASE_URL}movies`,
  subscriptions: `${SUBSCRIPTION_BASE_URL}subscriptions`,
  members: `${SUBSCRIPTION_BASE_URL}members`,
  getTimeout: `${CINEMA_BASE_URL}users/timeout`,
  updateTimeout: `${CINEMA_BASE_URL}users/timeout`,

};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(API_URLS.login, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(API_URLS.register, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URLS.users);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URLS.users}/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const fetchPermissionsForUser = async (userId) => {
  try {
    const response = await axios.get(API_URLS.permissions(userId));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_URLS.users}/${userId}`, userData);
    return response.data; 
  } catch (error) {
    throw error;
  }
};
export const createUser = async (userData) => {
  try {
    console.log("API received userData:", userData.permissionsData,userData.userData ); 

    const response = await axios.post(API_URLS.users, userData);
    return response.data; 
  } catch (error) {
    throw error;
  }
};

export const fetchMovies = async () => {
  try {
    const response = await axios.get(API_URLS.movies);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletehMovie = async (movieId) => {
  try {
    const response = await axios.delete(`${API_URLS.movies}/${movieId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createMovie = async (movieData) => {
  try {
    const response = await axios.post(API_URLS.movies, movieData);
    return response.data; 
  } catch (error) {
    throw error;
  }
};

export const updateMovie = async (movieId, movieData) => {
  try {
    const response = await axios.put(`${API_URLS.movies}/${movieId}`, movieData);
    return response.data; 
  } catch (error) {
    throw error;
  }
};



export const fetchSubscriptions = async () => {
  try {
    const response = await axios.get(API_URLS.subscriptions);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchSubscriptionsForMovie = async (movieId) => {
  try {
    const response = await axios.get(`${API_URLS.subscriptions}/${movieId}`); 
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createMember = async (memberData) => {
  try {
    const response = await axios.post(API_URLS.members, memberData);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const fetchMembers = async () => {
  try {
    const response = await axios.get(API_URLS.members);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletehMember = async (memberId) => {
  try {
    const response = await axios.delete(`${API_URLS.members}/${memberId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMoviesPerMember = async (memberId) => {
  try {
    const response = await axios.get(`${API_URLS.subscriptions}/member/${memberId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const subscribeToMovie = async (memberId, movieId,date) => {
  try {
    const subscriptionData = {
      memberId: memberId,
      movieId: movieId,
      date: date 
    };
    const response = await axios.post(`${API_URLS.subscriptions}`, subscriptionData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteSubscriptionsForMember = async (memberId) => {
  try {
    const response = await axios.delete(`${API_URLS.subscriptions}/${memberId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateMember = async (memberId, updatedData) => {
  try {
    const response = await axios.put(`${API_URLS.members}/${memberId}`, updatedData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserTimeoutSession =  (userId) => {
  try {
      return axios.get(`${API_URLS.getTimeout}/${userId}`);;

  } catch (error) {
    throw error;
  }
};

export const updateTimeoutSession = (userId, updatedSeconds) => {
  try {
    console.log("updateTimeoutSession",userId,updatedSeconds)
    return axios.put(`${API_URLS.updateTimeout}/${userId}`, { updatedSeconds });
     
  } catch (error) {
    throw error;
  }
};