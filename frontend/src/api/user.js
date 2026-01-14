import api from './axios';

// Get current user profile
export const getProfile = async () => {
    const response = await api.get('/nusers/profile');
    return response.data;
};

// Update user profile with optional image
export const updateProfile = async (formData) => {
    const response = await api.put('/nusers/profile', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// Get user by ID (for public profiles)
export const getUserById = async (userId) => {
    const response = await api.get(`/nusers/${userId}`);
    return response.data;
};