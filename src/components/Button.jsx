import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, RADIUS, SHADOWS, SPACING } from '../constants';

const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  loading = false, 
  disabled = false,
  style 
}) => {
  const variantStyles = {
    primary: {
      backgroundColor: COLORS.primary,
      textColor: COLORS.white,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: COLORS.primary,
      textColor: COLORS.primary,
    },
    accent: {
      backgroundColor: COLORS.accent,
      textColor: COLORS.white,
    },
  };

  const currentVariant = variantStyles[variant];

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: currentVariant.backgroundColor },
        currentVariant.borderWidth && { 
          borderWidth: currentVariant.borderWidth,
          borderColor: currentVariant.borderColor 
        },
        (disabled || loading) && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={currentVariant.textColor} />
      ) : (
        <Text style={[styles.text, { color: currentVariant.textColor }]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
    ...SHADOWS.small,
  },
  text: {
    fontSize: FONTS.sizes.base,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Button;