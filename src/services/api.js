import axios from 'axios';
import { API_URL } from '../constants';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Event API
export const eventAPI = {
  getInfo: async () => {
    const { data } = await api.get('/event');
    return data.data;
  },
};

// Artists API
export const artistsAPI = {
  getAll: async () => {
    const { data } = await api.get('/artists');
    return data.data;
  },
  
  getById: async (id) => {
    const { data } = await api.get(`/artists/${id}`);
    return data.data;
  },
};

// Bookings API
export const bookingsAPI = {
  create: async (bookingData) => {
    const { data } = await api.post('/bookings', bookingData);
    return data.data;
  },
  
  getByCode: async (code) => {
    const { data } = await api.get(`/bookings/${code}`);
    return data.data;
  },
  
  getByEmail: async (email) => {
    const { data } = await api.get(`/bookings/email/${email}`);
    return data.data;
  },
};

export default api;