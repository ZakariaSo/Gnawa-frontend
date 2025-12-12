import { useQuery } from '@tanstack/react-query';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Card from '../components/Card';
import { COLORS, FONTS, RADIUS, SPACING } from '../constants';
import { artistsAPI } from '../services/api';

const ArtistCard = ({ artist, onPress }) => {
  return (
    <Card onPress={onPress}>
      <View style={styles.artistCard}>
        <Image
          source={{ uri: artist.image_url }}
          style={styles.artistImage}
        />
        <View style={styles.artistInfo}>
          <Text style={styles.artistName}>{artist.name}</Text>
          <Text style={styles.artistInstruments} numberOfLines={1}>
            {artist.instruments}
          </Text>
          <View style={styles.timeContainer}>
            <Text style={styles.timeIcon}>🕐</Text>
            <Text style={styles.timeText}>{artist.performance_time}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

const ArtistsScreen = ({ navigation }) => {
  const { data: artists, isLoading } = useQuery({
    queryKey: ['artists'],
    queryFn: artistsAPI.getAll,
  });

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Chargement des artistes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nos Artistes</Text>
        <Text style={styles.subtitle}>
          {artists?.length} artiste{artists?.length > 1 ? 's' : ''} au programme
        </Text>
      </View>

      <FlatList
        data={artists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ArtistCard
            artist={item}
            onPress={() =>
              navigation.navigate('ArtistDetail', { artistId: item.id })
            }
          />
        )}
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
  artistCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  artistImage: {
    width: 80,
    height: 80,
    borderRadius: RADIUS.md,
    marginRight: SPACING.md,
  },
  artistInfo: {
    flex: 1,
  },
  artistName: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.grayDark,
    marginBottom: SPACING.xs,
  },
  artistInstruments: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray,
    marginBottom: SPACING.xs,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeIcon: {
    fontSize: FONTS.sizes.base,
    marginRight: 4,
  },
  timeText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default ArtistsScreen;