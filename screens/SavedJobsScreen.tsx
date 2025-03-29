// src/screens/SavedJobsScreen.tsx
import React, { useContext, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { SavedJobsContext } from '../context/SavedJobsContext';
import JobCard from '../components/JobCard';
import ConfirmModal from '../components/ConfirmModal';
import { Job } from '../api/jobApi(HARDCODEDTESTDATA)';

type Props = NativeStackScreenProps<RootStackParamList, 'SavedJobsScreen'>;

const SavedJobsScreen: React.FC<Props> = ({ navigation }) => {
  const { savedJobs, removeJob } = useContext(SavedJobsContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [jobToRemove, setJobToRemove] = useState<Job | null>(null);

  const confirmRemoveJob = (job: Job) => {
    setJobToRemove(job);
    setModalVisible(true);
  };

  const handleRemoveConfirmed = () => {
    if (jobToRemove) {
      removeJob(jobToRemove.id);
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
