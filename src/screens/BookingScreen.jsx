import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import Button from '../components/Button';
import Card from '../components/Card';
import { COLORS, FONTS, RADIUS, SPACING } from '../constants';
import { bookingsAPI } from '../services/api';
import useBookingStore from '../store/bookingStore';

const BookingScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    number_of_tickets: '1',
  });

  const addBooking = useBookingStore((state) => state.addBooking);

  const mutation = useMutation({
    mutationFn: bookingsAPI.create,
    onSuccess: async (data) => {
      await addBooking(data);
      Alert.alert(
        'Réservation confirmée ! 🎉',
        `Votre code de confirmation est : ${data.confirmation_code}`,
        [
          {
            text: 'Voir mes réservations',
            onPress: () => navigation.navigate('MyBookings'),
          },
        ]
      );
      // Reset form
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        number_of_tickets: '1',
      });
    },
    onError: (error) => {
      Alert.alert(
        'Erreur',
        error.response?.data?.message || 'Une erreur est survenue'
      );
    },
  });

  const handleSubmit = () => {
    if (!formData.full_name || !formData.email || !formData.phone) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    mutation.mutate({
      ...formData,
      number_of_tickets: parseInt(formData.number_of_tickets),
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Réserver vos billets</Text>
          <Text style={styles.subtitle}>Remplissez le formulaire ci-dessous</Text>
        </View>

        <Card>
          {/* Nom complet */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nom complet *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Mohammed Alami"
              value={formData.full_name}
              onChangeText={(text) =>
                setFormData({ ...formData, full_name: text })
              }
              placeholderTextColor={COLORS.gray}
            />
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: mohammed@example.com"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={COLORS.gray}
            />
          </View>

          {/* Téléphone */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Téléphone *</Text>
            <TextInput
              style={styles.input}
              placeholder="+212 6XX XXX XXX"
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              keyboardType="phone-pad"
              placeholderTextColor={COLORS.gray}
            />
          </View>

          {/* Nombre de billets */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre de billets (max 10) *</Text>
            <TextInput
              style={styles.input}
              placeholder="1"
              value={formData.number_of_tickets}
              onChangeText={(text) =>
                setFormData({ ...formData, number_of_tickets: text })
              }
              keyboardType="number-pad"
              placeholderTextColor={COLORS.gray}
            />
          </View>

          {/* Info Prix */}
          <View style={styles.priceInfo}>
            <Text style={styles.priceLabel}>Prix unitaire</Text>
            <Text style={styles.priceValue}>150 DH</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.priceInfo}>
            <Text style={styles.totalLabel}>Total à payer</Text>
            <Text style={styles.totalValue}>
              {parseInt(formData.number_of_tickets || 0) * 150} DH
            </Text>
          </View>
        </Card>

        <Button
          title="Confirmer la réservation"
          onPress={handleSubmit}
          loading={mutation.isPending}
          variant="primary"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.grayLight,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.md,
  },
  header: {
    marginBottom: SPACING.lg,
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
  inputGroup: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    color: COLORS.grayDark,
    marginBottom: SPACING.xs,
  },
  input: {
    backgroundColor: COLORS.grayLight,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    fontSize: FONTS.sizes.base,
    color: COLORS.grayDark,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  priceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
  },
  priceLabel: {
    fontSize: FONTS.sizes.base,
    color: COLORS.gray,
  },
  priceValue: {
    fontSize: FONTS.sizes.base,
    fontWeight: '600',
    color: COLORS.grayDark,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.sm,
  },
  totalLabel: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.grayDark,
  },
  totalValue: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});

export default BookingScreen;