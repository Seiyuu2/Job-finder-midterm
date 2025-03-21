// src/screens/ApplicationFormScreen.tsx
import React from 'react';
import { View, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useForm, Controller } from 'react-hook-form';
import { RootStackParamList } from '../navigation/AppNavigator';
import { validateEmail, validatePhoneNumber } from '../utils/validation';

type FormData = {
  name: string;
  email: string;
  contactNumber: string;
  reason: string;
};

type Props = NativeStackScreenProps<RootStackParamList, 'ApplicationFormScreen'>;

const ApplicationFormScreen: React.FC<Props> = ({ navigation, route }) => {
  const { job, fromSaved } = route.params || {};
  const { control, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // Process data: For example, call an API endpoint here.
    Alert.alert('Application Submitted', 'Thank you for applying!', [
      {
        text: 'Okay',
        onPress: () => {
          reset();
          navigation.navigate('JobFinderScreen');
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Controller
        control={control}
        name="name"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Name"
            style={styles.input}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        rules={{ required: true, validate: validateEmail }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
          />
        )}
      />
      <Controller
        control={control}
        name="contactNumber"
        rules={{ required: true, validate: validatePhoneNumber }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Contact Number"
            style={styles.input}
            onChangeText={onChange}
            value={value}
            keyboardType="phone-pad"
          />
        )}
      />
      <Controller
        control={control}
        name="reason"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Why should we hire you?"
            style={[styles.input, { height: 100 }]}
            onChangeText={onChange}
            value={value}
            multiline
          />
        )}
      />
      <Button title="Submit Application" onPress={handleSubmit(onSubmit)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#f1f1f1',
    marginVertical: 8,
    borderRadius: 8,
    padding: 10,
  },
});

export default ApplicationFormScreen;
