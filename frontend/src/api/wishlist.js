import api from './axios';

export const addToWishlist = async (eventId) => {
    const { data } = await api.post(`/wishlist/${eventId}`);
    return data;
};

export const removeFromWishlist = async (eventId) => {
    const { data } = await api.delete(`/wishlist/${eventId}`);
    return data;
};

export const getWishlist = async () => {
    const { data } = await api.get('/wishlist');
    return data;
};

export const checkWishlist = async (eventId) => {
    const { data } = await api.get(`/wishlist/check/${eventId}`);
    return data;
};