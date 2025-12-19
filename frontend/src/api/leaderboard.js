
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getTopAttendees = async (period = 'month') => {
    const response = await axios.get(`${API_URL}/leaderboard/top-attendees`, {
        params: { period }
    });
    return response.data;
};