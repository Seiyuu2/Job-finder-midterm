// src/components/JobCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Job } from '../api/jobApi';

type JobCardProps = {
  job: Job;
  onSave: (job: Job) => void;
  onApply: (job: Job) => void;
  saved: boolean;
};

const JobCard: React.FC<JobCardProps> = ({ job, onSave, onApply, saved }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.company}>{job.companyName}</Text>
      {job.salary && <Text style={styles.salary}>{job.salary}</Text>}
      {job.description && <Text style={styles.description}>{job.description}</Text>}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, saved && styles.savedButton]}
          onPress={() => onSave(job)}
          disabled={saved}
        >
          <Text style={styles.buttonText}>{saved ? 'Saved' : 'Save Job'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onApply(job)}>
          <Text style={styles.buttonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 16,
    color: '#555',
  },
  salary: {
    fontSize: 14,
    color: '#777',
  },
  description: {
    fontSize: 14,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  savedButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
  },
});

export default JobCard;
