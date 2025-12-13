import axiosInstance from './axiosInstance';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  ticket_price: number;
  total_capacity: number;
  banner_url: string;
  created_at: string;
  updated_at: string;
}

export const eventsAPI = {
 
  getEventInfo: async (): Promise<Event> => {
    const { data } = await axiosInstance.get('/event');
    return data.data;
  },
};