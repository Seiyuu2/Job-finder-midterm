// src/screens/SavedJobsScreen.tsx
import React, { useState } from 'react';
import { View, FlatList, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Job } from '../api/jobApi';
import JobCard from '../components/JobCard';

type Props = NativeStackScreenProps<RootStackParamList, 'SavedJobsScreen'>;

const SavedJobsScreen: React.FC<Props> = ({ navigation, route }) => {
  // Optionally, if savedJobs are passed as route params:
  const initialSavedJobs: Job[] = route.params?.savedJobs || [];
  const [savedJobs, setSavedJobs] = useState<Job[]>(initialSavedJobs);

  const handleRemoveJob = (job: Job) => {
    Alert.alert('Remove Job', 'Are you sure you want to remove this job?', [
      { text: 'Cancel' },
      {
        text: 'Yes',
        onPress: () => setSavedJobs((prev) => prev.filter((j) => j.id !== job.id)),
      },
    ]);
  };

  const handleApply = (job: Job) => {
    navigation.navigate('ApplicationFormScreen', { job, fromSaved: true });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={savedJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <JobCard
            job={item}
            onSave={() => {}}
            onApply={handleApply}
            saved={true}
          />
        )}
      />
      <Button title="Remove Selected Job" onPress={() => {
        // For demonstration, you might integrate a selection mechanism.
        Alert.alert('Remove a job by pressing its remove button on the card.');
      }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SavedJobsScreen;
