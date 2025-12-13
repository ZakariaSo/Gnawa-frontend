import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Loading from '../../components/Loading';
import { Colors, FontSizes, Spacing } from '../../constants/Colors';
import { useArtist } from '../../hooks/useArtists';
import { useEventInfo } from '../../hooks/useEvents';

export default function ArtistDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: artist, isLoading } = useArtist(id || '');
  const { data: event } = useEventInfo();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image
        source={{ uri: artist?.image_url }}
        style={styles.heroImage}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.artistName}>{artist?.name}</Text>
        <Card style={styles.timeCard}>
          <View style={styles.timeRow}>
            <Text style={styles.timeIcon}>🕐</Text>
            <View style={styles.timeInfo}>
              <Text style={styles.timeLabel}>Horaire de performance</Text>
              <Text style={styles.timeValue}>{artist?.performance_time}</Text>
            </View>
          </View>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>🎸 Instruments</Text>
          <Text style={styles.instrumentsText}>{artist?.instruments}</Text>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>📖 Biographie</Text>
          <Text style={styles.bioText}>{artist?.bio}</Text>
        </Card>

        <Button
          title="Réserver un billet"
          onPress={() => router.push(`/booking/${event?.id}`)}
          variant="primary"
          style={styles.ctaButton}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grayLight,
  },
  heroImage: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: Spacing.md,
  },
  artistName: {
    fontSize: FontSizes.xxxl,
    fontWeight: 'bold',
    color: Colors.grayDark,
    marginBottom: Spacing.md,
  },
  timeCard: {
    backgroundColor: Colors.primary,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeIcon: {
    fontSize: 32,
    marginRight: Spacing.md,
  },
  timeInfo: {
    flex: 1,
  },
  timeLabel: {
    fontSize: FontSizes.sm,
    color: Colors.white,
    opacity: 0.9,
    marginBottom: 4,
  },
  timeValue: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: Colors.white,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: Colors.grayDark,
    marginBottom: Spacing.sm,
  },
  instrumentsText: {
    fontSize: FontSizes.base,
    color: Colors.gray,
    lineHeight: 24,
  },
  bioText: {
    fontSize: FontSizes.base,
    color: Colors.gray,
    lineHeight: 24,
  },
  ctaButton: {
    marginTop: Spacing.lg,
  },
});