import api from './axios';

// export const joinEvent = async (eventId) => {
//   const response = await api.post('/history/join', { eventId });
//   return response.data;
// };
// Update your existing joinEvent function to accept registration data

export const joinEvent = async (eventId, registrationData = {}) => {

  const response = await api.post(`/history/join/${eventId}`, registrationData);
  return response.data;
};

export const getUserHistory = async (userId) => {
  const response = await api.get(`/history/user/${userId}`);
  return response.data;
};

export const removeFromHistory = async (historyId) => {
  const response = await api.delete(`/history/${historyId}`);
  return response.data;
};

export const cancelEventRegistration = async (historyId) => {
  const response = await api.post(`/history/${historyId}/cancel`);
  return response.data;
};