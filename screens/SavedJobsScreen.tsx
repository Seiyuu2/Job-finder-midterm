// src/screens/SavedJobsScreen.tsx
import React, { useState } from 'react';
import { View, FlatList, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Job } from '../api/jobApi';
import JobCard from '../components/JobCard';

type Props = NativeStackScreenProps<RootStackParamList, 'SavedJobsScreen'>;

const SavedJobsScreen: React.FC<Props> = ({ navigation, route }) => {
  // The route now has savedJobs as defined in RootStackParamList
  const initialSavedJobs: Job[] = route.params.savedJobs;
  const [savedJobs, setSavedJobs] = useState<Job[]>(initialSavedJobs);

  // Optionally, if you want to implement removal functionality,
  // you can integrate handleRemoveJob with a button on the JobCard.
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
