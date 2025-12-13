import axiosInstance from './axiosInstance';

export interface Artist {
  id: string;
  name: string;
  bio: string;
  image_url: string;
  performance_time: string;
  instruments: string;
  created_at: string;
  updated_at: string;
}

export const artistsAPI = {
  
  getAll: async (): Promise<Artist[]> => {
    const { data } = await axiosInstance.get('/artists');
    return data.data;
  },

  getById: async (id: string): Promise<Artist> => {
    const { data } = await axiosInstance.get(`/artists/${id}`);
    return data.data;
  },
};