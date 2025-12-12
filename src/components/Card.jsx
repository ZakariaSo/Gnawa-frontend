import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { COLORS, RADIUS, SHADOWS, SPACING } from '../constants';

const Card = ({ children, onPress, style }) => {
  if (onPress) {
    return (
      <TouchableOpacity
        style={[styles.card, style]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginVertical: SPACING.sm,
    ...SHADOWS.medium,
  },
});

export default Card;