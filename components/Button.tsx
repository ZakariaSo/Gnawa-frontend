import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { BorderRadius, Colors, FontSizes, Shadows, Spacing } from '../constants/Colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'accent';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  loading = false, 
  disabled = false,
  style 
}) => {
  const variantStyles: Record<string, { backgroundColor: string; borderWidth?: number; borderColor?: string; textColor: string }> = {
    primary: {
      backgroundColor: Colors.primary,
      textColor: Colors.white,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: Colors.primary,
      textColor: Colors.primary,
    },
    accent: {
      backgroundColor: Colors.accent,
      textColor: Colors.white,
    },
  };

  const currentVariant = variantStyles[variant];

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: currentVariant.backgroundColor },
        currentVariant.borderWidth ? { 
          borderWidth: currentVariant.borderWidth,
          borderColor: currentVariant.borderColor 
        } : null,
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
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
    ...Shadows.small,
  },
  text: {
    fontSize: FontSizes.base,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Button;