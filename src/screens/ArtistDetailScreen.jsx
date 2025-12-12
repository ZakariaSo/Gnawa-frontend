import { useQuery } from '@tanstack/react-query';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Button from '../components/Button';
import Card from '../components/Card';
import { COLORS, FONTS, SPACING } from '../constants';
import { artistsAPI } from '../services/api';

const ArtistDetailScreen = ({ route, navigation }) => {
  const { artistId } = route.params;

  const { data: artist, isLoading } = useQuery({
    queryKey: ['artist', artistId],
    queryFn: () => artistsAPI.getById(artistId),
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
      {/* Hero Image */}
      <Image
        source={{ uri: artist?.image_url }}
        style={styles.heroImage}
        resizeMode="cover"
      />

      <View style={styles.content}>
        {/* Artist Name */}
        <Text style={styles.artistName}>{artist?.name}</Text>

        {/* Performance Time Card */}
        <Card style={styles.timeCard}>
          <View style={styles.timeRow}>
            <Text style={styles.timeIcon}>🕐</Text>
            <View style={styles.timeInfo}>
              <Text style={styles.timeLabel}>Horaire de performance</Text>
              <Text style={styles.timeValue}>{artist?.performance_time}</Text>
            </View>
          </View>
        </Card>

        {/* Instruments Card */}
        <Card>
          <Text style={styles.sectionTitle}>🎸 Instruments</Text>
          <Text style={styles.instrumentsText}>{artist?.instruments}</Text>
        </Card>

        {/* Bio Card */}
        <Card>
          <Text style={styles.sectionTitle}>📖 Biographie</Text>
          <Text style={styles.bioText}>{artist?.bio}</Text>
        </Card>

        {/* CTA Button */}
        <Button
          title="Réserver un billet"
          onPress={() => navigation.navigate('Booking')}
          variant="primary"
          style={styles.ctaButton}
        />
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
  heroImage: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: SPACING.md,
  },
  artistName: {
    fontSize: FONTS.sizes.xxxl,
    fontWeight: 'bold',
    color: COLORS.grayDark,
    marginBottom: SPACING.md,
  },
  timeCard: {
    backgroundColor: COLORS.primary,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeIcon: {
    fontSize: 32,
    marginRight: SPACING.md,
  },
  timeInfo: {
    flex: 1,
  },
  timeLabel: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: 4,
  },
  timeValue: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.grayDark,
    marginBottom: SPACING.sm,
  },
  instrumentsText: {
    fontSize: FONTS.sizes.base,
    color: COLORS.gray,
    lineHeight: 24,
  },
  bioText: {
    fontSize: FONTS.sizes.base,
    color: COLORS.gray,
    lineHeight: 24,
  },
  ctaButton: {
    marginTop: SPACING.lg,
  },
});

export default ArtistDetailScreen;