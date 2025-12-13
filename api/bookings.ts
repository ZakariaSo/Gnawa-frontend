import axiosInstance from './axiosInstance';

export interface Booking {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  number_of_tickets: number;
  confirmation_code: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface CreateBookingData {
  full_name: string;
  email: string;
  phone: string;
  number_of_tickets: number;
}

export const bookingsAPI = {
 
  create: async (bookingData: CreateBookingData): Promise<Booking> => {
    const { data } = await axiosInstance.post('/bookings', bookingData);
    return data.data;
  },

  getByCode: async (code: string): Promise<Booking> => {
    const { data } = await axiosInstance.get(`/bookings/${code}`);
    return data.data;
  },
 
  getByEmail: async (email: string): Promise<Booking[]> => {
    const { data } = await axiosInstance.get(`/bookings/email/${email}`);
    return data.data;
  },
};