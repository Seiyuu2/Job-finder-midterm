// src/screens/SavedJobsScreen.tsx
import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Job } from '../api/jobApi';
import JobCard from '../components/JobCard';
import ConfirmModal from '../components/ConfirmModal';

type Props = NativeStackScreenProps<RootStackParamList, 'SavedJobsScreen'>;

const SavedJobsScreen: React.FC<Props> = ({ navigation, route }) => {
  const initialSavedJobs: Job[] = route.params.savedJobs;
  const [savedJobs, setSavedJobs] = useState<Job[]>(initialSavedJobs);
  const [modalVisible, setModalVisible] = useState(false);
  const [jobToRemove, setJobToRemove] = useState<Job | null>(null);

  const confirmRemoveJob = (job: Job) => {
    setJobToRemove(job);
    setModalVisible(true);
  };

  const handleRemoveConfirmed = () => {
    if (jobToRemove) {
      setSavedJobs((prev) => prev.filter((j) => j.id !== jobToRemove.id));
    }
    setModalVisible(false);
    setJobToRemove(null);
  };

  const handleCancelRemove = () => {
    setModalVisible(false);
    setJobToRemove(null);
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
            onRemove={() => confirmRemoveJob(item)}
            saved={true}
          />
        )}
      />
      <ConfirmModal
        visible={modalVisible}
        title="Remove Job"
        message="Are you sure you want to remove this job?"
        onConfirm={handleRemoveConfirmed}
        onCancel={handleCancelRemove}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SavedJobsScreen;
