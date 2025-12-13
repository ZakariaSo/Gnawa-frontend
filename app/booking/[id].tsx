import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
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
import Button from '../../components/Button';
import Card from '../../components/Card';
import Loading from '../../components/Loading';
import { BorderRadius, Colors, FontSizes, Spacing } from '../../constants/Colors';
import { useCreateBooking } from '../../hooks/useBookings';
import { useEventInfo } from '../../hooks/useEvents';

export default function BookingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: event, isLoading } = useEventInfo();
  const createBooking = useCreateBooking();

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    number_of_tickets: '1',
  });

  const handleSubmit = () => {
    if (!formData.full_name || !formData.email || !formData.phone) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    const tickets = parseInt(formData.number_of_tickets);
    if (tickets < 1 || tickets > 10) {
      Alert.alert('Erreur', 'Le nombre de billets doit être entre 1 et 10');
      return;
    }

    createBooking.mutate(
      {
        ...formData,
        number_of_tickets: tickets,
      },
      {
        onSuccess: (data) => {
          Alert.alert(
            'Réservation confirmée ! 🎉',
            `Votre code de confirmation est : ${data.confirmation_code}`,
            [
              {
                text: 'Voir mes billets',
                onPress: () => router.push('/tickets/tickets'),
              },
            ]
          );
          setFormData({
            full_name: '',
            email: '',
            phone: '',
            number_of_tickets: '1',
          });
        },
        onError: (error: any) => {
          Alert.alert(
            'Erreur',
            error.response?.data?.message || 'Une erreur est survenue'
          );
        },
      }
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  const totalPrice = parseInt(formData.number_of_tickets || '0') * (event?.ticket_price || 0);

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
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nom complet *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Mohammed Alami"
              value={formData.full_name}
              onChangeText={(text) =>
                setFormData({ ...formData, full_name: text })
              }
              placeholderTextColor={Colors.gray}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: mohammed@example.com"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={Colors.gray}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Téléphone *</Text>
            <TextInput
              style={styles.input}
              placeholder="+212 6XX XXX XXX"
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              keyboardType="phone-pad"
              placeholderTextColor={Colors.gray}
            />
          </View>

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
              placeholderTextColor={Colors.gray}
            />
          </View>

          {/* Info Prix */}
          <View style={styles.priceInfo}>
            <Text style={styles.priceLabel}>Prix unitaire</Text>
            <Text style={styles.priceValue}>{event?.ticket_price} DH</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.priceInfo}>
            <Text style={styles.totalLabel}>Total à payer</Text>
            <Text style={styles.totalValue}>{totalPrice} DH</Text>
          </View>
        </Card>

        <Button
          title="Confirmer la réservation"
          onPress={handleSubmit}
          loading={createBooking.isPending}
          variant="primary"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grayLight,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.md,
  },
  header: {
    marginBottom: Spacing.lg,
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
  inputGroup: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.grayDark,
    marginBottom: Spacing.xs,
  },
  input: {
    backgroundColor: Colors.grayLight,
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    fontSize: FontSizes.base,
    color: Colors.grayDark,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  priceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
  },
  priceLabel: {
    fontSize: FontSizes.base,
    color: Colors.gray,
  },
  priceValue: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.grayDark,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.sm,
  },
  totalLabel: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: Colors.grayDark,
  },
  totalValue: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: Colors.primary,
  },
});