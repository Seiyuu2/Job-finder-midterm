// src/components/JobCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Job } from '../api/jobApi';
import HTMLDescription from './HTMLDescription';

type JobCardProps = {
  job: Job;
  onSave?: (job: Job) => void;
  onApply?: (job: Job) => void;
  onRemove?: (job: Job) => void;
  saved?: boolean;
};

const JobCard: React.FC<JobCardProps> = ({
  job,
  onSave,
  onApply,
  onRemove,
  saved = false,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.company}>{job.companyName}</Text>
      {job.salary && <Text style={styles.salary}>{job.salary}</Text>}
      
      {/* Render HTML description with custom formatting */}
      {job.description ? (
        <HTMLDescription htmlContent={job.description} />
      ) : (
        <Text style={styles.description}>No description available</Text>
      )}

      {/* Render tags if available */}
      {job.tags && job.tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {job.tags.map((tag, index) => (
            <View key={index} style={styles.tagChip}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.buttonContainer}>
        {onSave && (
          <TouchableOpacity
            style={[styles.button, saved && styles.savedButton]}
            onPress={() => onSave(job)}
            disabled={saved}
          >
            <Text style={styles.buttonText}>{saved ? 'Saved' : 'Save Job'}</Text>
          </TouchableOpacity>
        )}
        {onApply && (
          <TouchableOpacity style={styles.button} onPress={() => onApply(job)}>
            <Text style={styles.buttonText}>Apply</Text>
          </TouchableOpacity>
        )}
        {onRemove && (
          <TouchableOpacity
            style={[styles.button, styles.removeButton]}
            onPress={() => onRemove(job)}
          >
            <Text style={styles.buttonText}>Remove</Text>
          </TouchableOpacity>
        )}
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
    marginVertical: 4,
  },
  description: {
    fontSize: 14,
    marginVertical: 5,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  tagChip: {
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 12,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginRight: 8,
    alignItems: 'center',
    minWidth: 80,
  },
  savedButton: {
    backgroundColor: '#28a745',
  },
  removeButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
  },
});

export default JobCard;
