import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

const STORAGE_KEY = '@gnawa_bookings';

const useBookingStore = create((set, get) => ({

  bookings: [],
  currentBooking: null,
  loading: false,
  error: null,


  addBooking: async (booking) => {
    try {
      const newBookings = [...get().bookings, booking];
      set({ bookings: newBookings, currentBooking: booking });
      

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newBookings));
      
      return booking;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  setCurrentBooking: (booking) => {
    set({ currentBooking: booking });
  },

  loadBookings: async () => {
    try {
      set({ loading: true });
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        set({ bookings: JSON.parse(stored), loading: false });
      } else {
        set({ loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  clearBookings: async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      set({ bookings: [], currentBooking: null });
    } catch (error) {
      set({ error: error.message });
    }
  },

  setError: (error) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  },
}));

export default useBookingStore;