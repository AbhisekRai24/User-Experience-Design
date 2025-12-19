import api from './axios';

export const getEvents = async (category = 'All Events') => {
  const params = category && category !== 'All Events' ? { category } : {};
  const response = await api.get('/events', { params });
  return response.data;
};


// NEW: Search events function
export const searchEvents = async (query) => {
  const response = await api.get('/events/search', {
    params: { query }
  });
  return response.data;
};

export const getEventById = async (id) => {
  const response = await api.get(`/events/${id}`);
  return response.data;
};

// export const createEvent = async (eventData) => {
//   const formData = new FormData();
//   Object.keys(eventData).forEach((key) => {
//     if (key === 'image' && eventData[key]) {
//       formData.append('image', eventData[key]);
//     } else {
//       formData.append(key, eventData[key]);
//     }
//   });
//   const response = await api.post('/events', formData, {
//     headers: { 'Content-Type': 'multipart/form-data' },
//   });
//   return response.data;
// };

export const createEvent = async (eventData) => {
  console.log('\n=== CLIENT: CREATE EVENT START ===');
  console.log('Event Data received:', eventData);

  const formData = new FormData();

  Object.keys(eventData).forEach((key) => {
    if (key === 'image' && eventData[key]) {
      console.log('Adding image to FormData:', {
        name: eventData[key].name,
        size: eventData[key].size,
        type: eventData[key].type
      });
      formData.append('image', eventData[key]);
    } else {
      console.log(`Adding ${key} to FormData:`, eventData[key]);
      formData.append(key, eventData[key]);
    }
  });

  // Log FormData contents (for debugging)
  console.log('\nFormData entries:');
  for (let [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`  ${key}:`, {
        name: value.name,
        size: value.size,
        type: value.type
      });
    } else {
      console.log(`  ${key}:`, value);
    }
  }

  console.log('\nSending POST request to /events...');

  try {
    const response = await api.post('/events', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    console.log('✓ Response received:', response.data);
    console.log('=== CLIENT: CREATE EVENT SUCCESS ===\n');

    return response.data;
  } catch (error) {
    console.error('\n❌ CLIENT: CREATE EVENT ERROR');
    console.error('Error message:', error.message);
    console.error('Error response:', error.response?.data);
    console.error('Error status:', error.response?.status);
    console.error('Full error:', error);
    console.error('=== CLIENT: CREATE EVENT FAILED ===\n');

    throw error;
  }
};

// export const createEvent = async (eventData) => {
//   try {
//     const formData = new FormData();

//     Object.keys(eventData).forEach((key) => {
//       if (eventData[key] !== null && eventData[key] !== undefined) {
//         formData.append(key, eventData[key]);
//       }
//     });

//     const response = await api.post('/events', formData);
//     return response.data;
//   } catch (error) {
//     console.error('Full error:', error.response?.data);
//     throw error;
//   }
// };

export const updateEvent = async (id, eventData) => {
  const formData = new FormData();
  Object.keys(eventData).forEach((key) => {
    if (key === 'image' && eventData[key]) {
      formData.append('image', eventData[key]);
    } else {
      formData.append(key, eventData[key]);
    }
  });
  const response = await api.put(`/events/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const deleteEvent = async (id) => {
  const response = await api.delete(`/events/${id}`);
  return response.data;
};

