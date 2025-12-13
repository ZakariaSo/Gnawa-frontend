import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { create } from 'zustand';
import { Booking, bookingsAPI, CreateBookingData } from '../api/bookings';

const STORAGE_KEY = '@gnawa_bookings';

// Zustand Store pour la gestion locale
interface BookingStore {
  bookings: Booking[];
  addBooking: (booking: Booking) => Promise<void>;
  loadBookings: () => Promise<void>;
  clearBookings: () => Promise<void>;
}

export const useBookingStore = create<BookingStore>((set, get) => ({
  bookings: [],
  
  addBooking: async (booking: Booking) => {
    const newBookings = [...get().bookings, booking];
    set({ bookings: newBookings });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newBookings));
  },
  
  loadBookings: async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        set({ bookings: JSON.parse(stored) });
      }
    } catch (error) {
      console.error('Error loading bookings:', error);
    }
  },
  
  clearBookings: async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    set({ bookings: [] });
  },
}));

// Hook pour créer une réservation
export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  const addBooking = useBookingStore((state) => state.addBooking);

  return useMutation({
    mutationFn: (data: CreateBookingData) => bookingsAPI.create(data),
    onSuccess: async (data) => {
      await addBooking(data);
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};

// Hook pour obtenir une réservation par code
export const useBookingByCode = (code: string) => {
  return useQuery({
    queryKey: ['booking', code],
    queryFn: () => bookingsAPI.getByCode(code),
    enabled: !!code && code.length === 8,
  });
};

// Hook pour obtenir les réservations par email
export const useBookingsByEmail = (email: string) => {
  return useQuery({
    queryKey: ['bookings', 'email', email],
    queryFn: () => bookingsAPI.getByEmail(email),
    enabled: !!email && email.includes('@'),
  });
};