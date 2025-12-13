import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import Card from '../../components/Card';
import Loading from '../../components/Loading';
import { BorderRadius, Colors, FontSizes, Spacing } from '../../constants/Colors';
import { useArtists } from '../../hooks/useArtists';

export default function EventListScreen() {
  const router = useRouter();
  const { data: artists, isLoading } = useArtists();

  if (isLoading) {
    return <Loading text="Chargement des artistes..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nos Artistes</Text>
        <Text style={styles.subtitle}>
          {artists?.length} artiste{artists && artists.length > 1 ? 's' : ''} au programme
        </Text>
      </View>

      <FlatList
        data={artists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card onPress={() => router.push(`/artist/${item.id}`)}>
            <View style={styles.artistCard}>
              <Image
                source={{ uri: item.image_url }}
                style={styles.artistImage}
              />
              <View style={styles.artistInfo}>
                <Text style={styles.artistName}>{item.name}</Text>
                <Text style={styles.artistInstruments} numberOfLines={1}>
                  {item.instruments}
                </Text>
                <View style={styles.timeContainer}>
                  <Text style={styles.timeIcon}>🕐</Text>
                  <Text style={styles.timeText}>{item.performance_time}</Text>
                </View>
              </View>
            </View>
          </Card>
        )}
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
  artistCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  artistImage: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.md,
    marginRight: Spacing.md,
  },
  artistInfo: {
    flex: 1,
  },
  artistName: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: Colors.grayDark,
    marginBottom: Spacing.xs,
  },
  artistInstruments: {
    fontSize: FontSizes.sm,
    color: Colors.gray,
    marginBottom: Spacing.xs,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeIcon: {
    fontSize: FontSizes.base,
    marginRight: 4,
  },
  timeText: {
    fontSize: FontSizes.sm,
    color: Colors.primary,
    fontWeight: '600',
  },
});