import { useEffect } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Card from '../components/Card';
import { COLORS, FONTS, RADIUS, SPACING } from '../constants';
import useBookingStore from '../store/bookingStore';

const BookingCard = ({ booking }) => {
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

const MyBookingsScreen = () => {
  const { bookings, loadBookings } = useBookingStore();

  useEffect(() => {
    loadBookings();
  }, []);

  if (bookings.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🎫</Text>
        <Text style={styles.emptyTitle}>Aucune réservation</Text>
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
        <Text style={styles.title}>Mes Réservations</Text>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.grayLight,
  },
  header: {
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: 'bold',
    color: COLORS.grayDark,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONTS.sizes.base,
    color: COLORS.gray,
  },
  list: {
    padding: SPACING.md,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  statusBadge: {
    backgroundColor: COLORS.success,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
  },
  statusText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
  },
  code: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 2,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.sm,
  },
  bookingDetails: {
    marginBottom: SPACING.sm,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.xs,
  },
  detailLabel: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray,
  },
  detailValue: {
    fontSize: FONTS.sizes.base,
    fontWeight: '500',
    color: COLORS.grayDark,
  },
  ticketsValue: {
    fontSize: FONTS.sizes.base,
    fontWeight: '600',
    color: COLORS.primary,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: FONTS.sizes.base,
    fontWeight: 'bold',
    color: COLORS.grayDark,
  },
  totalValue: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  dateContainer: {
    marginTop: SPACING.sm,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  dateText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.gray,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
    backgroundColor: COLORS.grayLight,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: SPACING.lg,
  },
  emptyTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.grayDark,
    marginBottom: SPACING.sm,
  },
  emptyText: {
    fontSize: FONTS.sizes.base,
    color: COLORS.gray,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default MyBookingsScreen;