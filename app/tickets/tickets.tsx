import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Booking } from '../../api/bookings';
import Card from '../../components/Card';
import { BorderRadius, Colors, FontSizes, Spacing } from '../../constants/Colors';
import { useBookingStore } from '../../hooks/useBookings';

const BookingCard: React.FC<{ booking: Booking }> = ({ booking }) => {
  return (
    <Card>
      <View style={styles.bookingHeader}>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>✓ Confirmé</Text>
        </View>
        <Text style={styles.code}>{booking.confirmation_code}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.bookingDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Nom</Text>
          <Text style={styles.detailValue}>{booking.full_name}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Email</Text>
          <Text style={styles.detailValue}>{booking.email}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Téléphone</Text>
          <Text style={styles.detailValue}>{booking.phone}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Billets</Text>
          <Text style={styles.ticketsValue}>
            {booking.number_of_tickets} billet{booking.number_of_tickets > 1 ? 's' : ''}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total payé</Text>
          <Text style={styles.totalValue}>
            {booking.number_of_tickets * 150} DH
          </Text>
        </View>
      </View>

      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>
          Réservé le {new Date(booking.created_at).toLocaleDateString('fr-FR')}
        </Text>
      </View>
    </Card>
  );
};

export default function TicketsScreen() {
  const { bookings, loadBookings } = useBookingStore();

  useEffect(() => {
    loadBookings();
  }, []);

  if (bookings.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🎫</Text>
        <Text style={styles.emptyTitle}>Aucun billet</Text>
        <Text style={styles.emptyText}>
          Vous n avez pas encore de réservation.{'\n'}
          Réservez vos billets dès maintenant !
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes Billets</Text>
        <Text style={styles.subtitle}>
          {bookings.length} réservation{bookings.length > 1 ? 's' : ''}
        </Text>
      </View>

      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id || item.confirmation_code}
        renderItem={({ item }) => <BookingCard booking={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grayLight,
  },
  header: {
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: FontSizes.xxl,
    fontWeight: 'bold',
    color: Colors.grayDark,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSizes.base,
    color: Colors.gray,
  },
  list: {
    padding: Spacing.md,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  statusBadge: {
    backgroundColor: Colors.success,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  statusText: {
    color: Colors.white,
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  code: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: Colors.primary,
    letterSpacing: 2,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.sm,
  },
  bookingDetails: {
    marginBottom: Spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.xs,
  },
  detailLabel: {
    fontSize: FontSizes.sm,
    color: Colors.gray,
  },
  detailValue: {
    fontSize: FontSizes.base,
    fontWeight: '500',
    color: Colors.grayDark,
  },
  ticketsValue: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.primary,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: FontSizes.base,
    fontWeight: 'bold',
    color: Colors.grayDark,
  },
  totalValue: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  dateContainer: {
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  dateText: {
    fontSize: FontSizes.xs,
    color: Colors.gray,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
    backgroundColor: Colors.grayLight,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: Spacing.lg,
  },
  emptyTitle: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: Colors.grayDark,
    marginBottom: Spacing.sm,
  },
  emptyText: {
    fontSize: FontSizes.base,
    color: Colors.gray,
    textAlign: 'center',
    lineHeight: 24,
  },
});