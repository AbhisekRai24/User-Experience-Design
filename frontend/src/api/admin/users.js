import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getAuthHeader = () => {
  const token = JSON.parse(localStorage.getItem('auth-storage'))?.state?.accessToken;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}/users`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const getUserById = async (userId) => {
  const response = await axios.get(`${API_URL}/users/${userId}`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const createUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users`, userData, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const updateUser = async (userId, userData) => {
  const response = await axios.put(`${API_URL}/users/${userId}`, userData, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await axios.delete(`${API_URL}/users/${userId}`, {
    headers: getAuthHeader(),
  });
  return response.data;
};