// src/screens/ApplicationFormScreen.tsx
import React, { useContext } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, ScrollView, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useForm, Controller } from 'react-hook-form';
import { RootStackParamList } from '../navigation/AppNavigator';
import { validateEmail, validatePhoneNumber } from '../utils/validation';
import { ThemeContext } from '../context/ThemeContext';

type FormData = {
  name: string;
  email: string;
  contactNumber: string;
  reason: string;
};

type Props = NativeStackScreenProps<RootStackParamList, 'ApplicationFormScreen'>;

const ApplicationFormScreen: React.FC<Props> = ({ navigation, route }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    Alert.alert('Application Submitted', 'Thank you for applying!', [
      {
        text: 'Okay',
        onPress: () => {
          reset();
          // Instead of navigating to JobFinderScreen,
          // we pop to the top of the stack so that the back arrow is removed.
          navigation.popToTop();
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, isDarkMode && styles.containerDark]}>
      <View style={styles.formContainer}>
        <Controller
          control={control}
          name="name"
          rules={{ required: 'Name is required.' }}
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                placeholder="Name"
                style={styles.input}
                onChangeText={onChange}
                value={value}
              />
              {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
            </>
          )}
        />
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Email is required.',
            validate: validateEmail || 'Invalid email format (letter@email.com).',
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                placeholder="Email"
                style={styles.input}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
              />
              {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
            </>
          )}
        />
        <Controller
          control={control}
          name="contactNumber"
          rules={{
            required: 'Contact Number is required.',
            validate: validatePhoneNumber || 'Invalid phone number. Only numbers allowed.',
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                placeholder="Contact Number"
                style={styles.input}
                onChangeText={onChange}
                value={value}
                keyboardType="phone-pad"
              />
              {errors.contactNumber && <Text style={styles.errorText}>{errors.contactNumber.message}</Text>}
            </>
          )}
        />
        <Controller
          control={control}
          name="reason"
          rules={{ required: 'Please tell us why you should be hired.' }}
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                placeholder="Why should we hire you?"
                style={[styles.input, { height: 100 }]}
                onChangeText={onChange}
                value={value}
                multiline
              />
              {errors.reason && <Text style={styles.errorText}>{errors.reason.message}</Text>}
            </>
          )}
        />
        <Button title="Submit Application" onPress={handleSubmit(onSubmit)} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#f1f1f1',
  },
  containerDark: {
    backgroundColor: '#333',
  },
  formContainer: {
    backgroundColor: '#ccc',
    borderRadius: 8,
    padding: 16,
  },
  input: {
    backgroundColor: '#FFF',
    marginVertical: 8,
    borderRadius: 8,
    padding: 10,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default ApplicationFormScreen;
