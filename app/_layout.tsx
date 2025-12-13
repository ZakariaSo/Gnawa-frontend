import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { Colors } from '../constants/Colors';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'La Grande Soirée Gnawa',
          }}
        />
        <Stack.Screen
          name="events/EventListScreen"
          options={{
            title: 'Événements',
          }}
        />
        <Stack.Screen
          name="events/[id]"
          options={{
            title: 'Détails de l\'événement',
          }}
        />
        <Stack.Screen
          name="artist/[id]"
          options={{
            title: 'Artiste',
          }}
        />
        <Stack.Screen
          name="booking/[id]"
          options={{
            title: 'Réservation',
          }}
        />
        <Stack.Screen
          name="payment/Payment"
          options={{
            title: 'Paiement',
          }}
        />
        <Stack.Screen
          name="tickets/tickets"
          options={{
            title: 'Mes Billets',
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}