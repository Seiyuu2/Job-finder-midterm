// src/screens/JobFinderScreen.tsx
import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, ActivityIndicator, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { fetchJobs, Job } from '../api/jobApi';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import { SavedJobsContext } from '../context/SavedJobsContext';
import { ThemeContext } from '../context/ThemeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'JobFinderScreen'>;

const JobFinderScreen: React.FC<Props> = ({ navigation }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const { savedJobs, addJob } = useContext(SavedJobsContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    (async () => {
      const data = await fetchJobs();
      setJobs(data);
      setFilteredJobs(data);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredJobs(jobs);
    } else {
      setFilteredJobs(
        jobs.filter((job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, jobs]);

  const handleSaveJob = (job: Job) => {
    addJob(job);
  };

  const handleApply = (job: Job) => {
    navigation.navigate('ApplicationFormScreen', { job });
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <JobCard
            job={item}
            onSave={handleSaveJob}
            onApply={handleApply}
            saved={savedJobs.some((saved) => saved.id === item.id)}
          />
        )}
      />
      <Button
        title="Go to Saved Jobs"
        onPress={() => navigation.navigate('SavedJobsScreen')}
      />
      {/* A button to toggle dark mode */}
      <Button title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"} onPress={toggleTheme} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
});

export default JobFinderScreen;
