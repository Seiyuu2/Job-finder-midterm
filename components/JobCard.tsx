// src/components/JobCard.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import HTMLDescription from './HTMLDescription';
import { Job } from '../api/jobApi';

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
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription((prev) => !prev);
  };

  // For this example, we simply display salary as-is.
  const salaryString = job.salary || "";

  return (
    <View style={styles.card}>
      {/* Header with logo, title, and company */}
      <View style={styles.header}>
        {job.companyLogo ? (
          <Image source={{ uri: job.companyLogo }} style={styles.logo} />
        ) : null}
        <View style={styles.headerText}>
          <Text style={styles.title}>{job.title}</Text>
          <Text style={styles.company}>{job.companyName}</Text>
        </View>
      </View>

      {/* Key Information Chips */}
      <View style={styles.keyInfoRow}>
        {salaryString !== "" && (
          <View style={styles.infoChip}>
            <Text style={styles.infoChipText}>{salaryString}</Text>
          </View>
        )}
        {job.jobType && (
          <View style={styles.infoChip}>
            <Text style={styles.infoChipText}>{job.jobType}</Text>
          </View>
        )}
        {job.workModel && (
          <View style={styles.infoChip}>
            <Text style={styles.infoChipText}>{job.workModel}</Text>
          </View>
        )}
        {job.seniorityLevel && (
          <View style={styles.infoChip}>
            <Text style={styles.infoChipText}>{job.seniorityLevel}</Text>
          </View>
        )}
      </View>

      {/* Location Chips */}
      {job.locations && job.locations.length > 0 && (
        <View style={styles.locationsContainer}>
          {job.locations.map((loc, index) => (
            <View key={index.toString()} style={styles.locationChip}>
              <Text style={styles.locationText}>{loc}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Toggle Full Description */}
      {showDescription ? (
        <>
          <HTMLDescription htmlContent={job.description || ''} />
          <TouchableOpacity style={[styles.button, styles.toggleButton]} onPress={toggleDescription}>
            <Text style={styles.buttonText}>Hide Details</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={[styles.button, styles.toggleButton]} onPress={toggleDescription}>
          <Text style={styles.buttonText}>View More Details</Text>
        </TouchableOpacity>
      )}

      {/* Action Buttons */}
      <View style={styles.actionRow}>
        {onSave && (
          <TouchableOpacity
            style={[styles.actionButton, saved && styles.savedButton]}
            onPress={() => onSave(job)}
            disabled={saved}
          >
            <Text style={styles.actionButtonText}>{saved ? 'Saved' : 'Save Job'}</Text>
          </TouchableOpacity>
        )}
        {onApply && (
          <TouchableOpacity style={styles.actionButton} onPress={() => onApply(job)}>
            <Text style={styles.actionButtonText}>Apply</Text>
          </TouchableOpacity>
        )}
        {onRemove && (
          <TouchableOpacity
            style={[styles.actionButton, styles.removeButton]}
            onPress={() => onRemove(job)}
          >
            <Text style={styles.actionButtonText}>Remove</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default JobCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 10,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  keyInfoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 4,
  },
  infoChip: {
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  infoChipText: {
    fontSize: 12,
    color: '#333',
  },
  locationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 6,
  },
  locationChip: {
    backgroundColor: '#d4edda',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  locationText: {
    fontSize: 12,
    color: '#155724',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  toggleButton: {
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  actionButton: {
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
  actionButtonText: {
    color: '#FFF',
    fontSize: 14,
  },
});
