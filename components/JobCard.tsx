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

const getSalaryString = (job: Job): string => {
  if (job.minSalary && job.maxSalary && job.minSalary !== job.maxSalary) {
    return `$${job.minSalary} - $${job.maxSalary}`;
  } else if (job.minSalary && !job.maxSalary) {
    return `Starting at $${job.minSalary}`;
  } else if (job.maxSalary && !job.minSalary) {
    return `Up to $${job.maxSalary}`;
  } else if (job.salary) {
    return job.salary;
  }
  return "";
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
    setShowDescription(prev => !prev);
  };

  const salaryString = getSalaryString(job);

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

      {/* Details Section */}
      <View style={styles.detailsSection}>
        {job.seniorityLevel ? (
          <Text style={styles.detailText}>
            <Text style={styles.detailLabel}>Seniority Level: </Text>
            {job.seniorityLevel}
          </Text>
        ) : null}
        {job.workModel ? (
          <Text style={styles.detailText}>
            <Text style={styles.detailLabel}>Work Model: </Text>
            {job.workModel}
          </Text>
        ) : null}
        {job.jobType ? (
          <Text style={styles.detailText}>
            <Text style={styles.detailLabel}>Job Type: </Text>
            {job.jobType}
          </Text>
        ) : null}
        {(job.minSalary || job.maxSalary || job.salary) && (
          <>
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Starting Salary: </Text>
              {job.minSalary ? `$${job.minSalary}` : 'N/A'}
            </Text>
            {job.maxSalary ? (
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Salary Cap: </Text>
                {`$${job.maxSalary}`}
              </Text>
            ) : null}
          </>
        )}
      </View>

      {/* Location Section */}
      {job.locations && job.locations.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Location:</Text>
          <View style={styles.chipsContainer}>
            {job.locations.map((loc, index) => (
              <View key={index.toString()} style={styles.chip}>
                <Text style={styles.chipText}>{loc}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Tags Section */}
      {job.tags && job.tags.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>TAGS:</Text>
          <View style={styles.chipsContainer}>
            {job.tags.map((tag, index) => (
              <View key={index.toString()} style={styles.chip}>
                <Text style={styles.chipText}>{tag}</Text>
              </View>
            ))}
          </View>
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
  detailsSection: {
    marginVertical: 6,
  },
  detailText: {
    fontSize: 12,
    color: '#333',
    marginVertical: 2,
  },
  detailLabel: {
    fontWeight: 'bold',
  },
  section: {
    marginVertical: 6,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  chipText: {
    fontSize: 12,
    color: '#333',
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
