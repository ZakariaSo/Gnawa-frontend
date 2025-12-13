import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import Card from '../components/Card';
import Loading from '../components/Loading';
import { Colors, FontSizes, Spacing } from '../constants/Colors';
import { useArtists } from '../hooks/useArtists';
import { useEventInfo } from '../hooks/useEvents';

export default function HomeScreen() {
  const router = useRouter();
  const { data: event, isLoading: eventLoading } = useEventInfo();
  const { data: artists, isLoading: artistsLoading } = useArtists();

  if (eventLoading || artistsLoading) {
    return <Loading />;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
    
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

      <View style={styles.content}>
      
        <Card>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📅 Date</Text>
            <Text style={styles.infoValue}>
              {new Date(event?.date || '').toLocaleDateString('fr-FR', {
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

        <Card>
          <Text style={styles.sectionTitle}>À propos de l événement</Text>
          <Text style={styles.description}>{event?.description}</Text>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>
            🎵 Artistes ({artists?.length})
          </Text>
          <Text style={styles.artistsPreview}>
            {artists?.slice(0, 3).map((a) => a.name).join(' • ')}
            {artists && artists.length > 3 && '...'}
          </Text>
        </Card>

        <View style={styles.actions}>
          <Button
            title="Voir tous les artistes"
            onPress={() => router.push('/events/EventListScreen')}
            variant="primary"
            style={styles.actionButton}
          />

          <Button
            title="Réserver des billets"
            onPress={() => router.push(`/booking/${event?.id}`)}
            variant="accent"
            style={styles.actionButton}
          />

          <Button
            title="Mes billets"
            onPress={() => router.push('/tickets/tickets')}
            variant="outline"
            style={styles.actionButton}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grayLight,
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
    padding: Spacing.lg,
  },
  heroTitle: {
    fontSize: FontSizes.xxxl,
    fontWeight: 'bold',
    color: Colors.white,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  content: {
    padding: Spacing.md,
  },
  infoRow: {
    paddingVertical: Spacing.sm,
  },
  infoLabel: {
    fontSize: FontSizes.sm,
    color: Colors.gray,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.grayDark,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.xs,
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: Colors.grayDark,
    marginBottom: Spacing.sm,
  },
  description: {
    fontSize: FontSizes.base,
    color: Colors.gray,
    lineHeight: 24,
  },
  artistsPreview: {
    fontSize: FontSizes.base,
    color: Colors.gray,
    lineHeight: 24,
  },
  actions: {
    marginTop: Spacing.md,
  },
  actionButton: {
    marginBottom: Spacing.md,
  },
});