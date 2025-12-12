import { useQuery } from '@tanstack/react-query';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Button from '../components/Button';
import Card from '../components/Card';
import { COLORS, FONTS, SPACING } from '../constants';
import { eventAPI } from '../services/api';

const HomeScreen = ({ navigation }) => {
  const { data: event, isLoading } = useQuery({
    queryKey: ['event'],
    queryFn: eventAPI.getInfo,
  });

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Banner */}
      <View style={styles.hero}>
        <Image
          source={{ uri: event?.banner_url }}
          style={styles.bannerImage}
          resizeMode="cover"
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>{event?.title}</Text>
        </View>
      </View>

      {/* Event Info Card */}
      <View style={styles.content}>
        <Card>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📅 Date</Text>
            <Text style={styles.infoValue}>
              {new Date(event?.date).toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>⏰ Heure</Text>
            <Text style={styles.infoValue}>{event?.time}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📍 Lieu</Text>
            <Text style={styles.infoValue}>{event?.venue}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>💰 Prix</Text>
            <Text style={styles.infoValue}>{event?.ticket_price} DH</Text>
          </View>
        </Card>

        {/* Description */}
        <Card>
          <Text style={styles.sectionTitle}>À propos</Text>
          <Text style={styles.description}>{event?.description}</Text>
        </Card>

        {/* Quick Actions */}
        <View style={styles.actions}>
          <Button
            title="Voir les Artistes"
            onPress={() => navigation.navigate('Artists')}
            variant="primary"
            style={styles.actionButton}
          />

          <Button
            title="Réserver un billet"
            onPress={() => navigation.navigate('Booking')}
            variant="accent"
            style={styles.actionButton}
          />

          <Button
            title="Mes Réservations"
            onPress={() => navigation.navigate('MyBookings')}
            variant="outline"
            style={styles.actionButton}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.grayLight,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.grayLight,
  },
  loadingText: {
    fontSize: FONTS.sizes.lg,
    color: COLORS.gray,
  },
  hero: {
    height: 250,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    padding: SPACING.lg,
  },
  heroTitle: {
    fontSize: FONTS.sizes.xxxl,
    fontWeight: 'bold',
    color: COLORS.white,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  content: {
    padding: SPACING.md,
  },
  infoRow: {
    paddingVertical: SPACING.sm,
  },
  infoLabel: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: FONTS.sizes.base,
    fontWeight: '600',
    color: COLORS.grayDark,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.xs,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.grayDark,
    marginBottom: SPACING.sm,
  },
  description: {
    fontSize: FONTS.sizes.base,
    color: COLORS.gray,
    lineHeight: 24,
  },
  actions: {
    marginTop: SPACING.md,
  },
  actionButton: {
    marginBottom: SPACING.md,
  },
});

export default HomeScreen;