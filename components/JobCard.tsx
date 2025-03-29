// src/components/JobCard.tsx
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import HTMLDescription from './HTMLDescription';
import { Job } from '../api/jobApi';
import { ThemeContext } from '../context/ThemeContext';

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
  const { isDarkMode } = useContext(ThemeContext);

  const toggleDescription = () => setShowDescription(prev => !prev);

  const salaryString = getSalaryString(job);

  return (
    <View style={[styles.card, isDarkMode && styles.cardDark]}>
      {/* Header with logo, title, and company */}
      <View style={styles.header}>
        {job.companyLogo ? (
          <Image source={{ uri: job.companyLogo }} style={styles.logo} />
        ) : null}
        <View style={styles.headerText}>
          <Text style={[styles.title, isDarkMode && styles.titleDark]}>{job.title}</Text>
          <Text style={[styles.company, isDarkMode && styles.companyDark]}>{job.companyName}</Text>
        </View>
      </View>

      {/* Details Section */}
      <View style={styles.detailsSection}>
        {job.seniorityLevel ? (
          <Text style={[styles.detailText, isDarkMode && styles.detailTextDark]}>
            <Text style={styles.detailLabel}>Position: </Text>
            {job.seniorityLevel}
          </Text>
        ) : null}
        {job.workModel ? (
          <Text style={[styles.detailText, isDarkMode && styles.detailTextDark]}>
            <Text style={styles.detailLabel}>Work Model: </Text>
            {job.workModel}
          </Text>
        ) : null}
        {job.jobType ? (
          <Text style={[styles.detailText, isDarkMode && styles.detailTextDark]}>
            <Text style={styles.detailLabel}>Job Type: </Text>
            {job.jobType}
          </Text>
        ) : null}
        {(job.minSalary || job.maxSalary || job.salary) && (
          <>
            <Text style={[styles.detailText, isDarkMode && styles.detailTextDark]}>
              <Text style={styles.detailLabel}>Starting Salary: </Text>
              {job.minSalary ? `$${job.minSalary}` : 'N/A'}
            </Text>
            {job.maxSalary ? (
              <Text style={[styles.detailText, isDarkMode && styles.detailTextDark]}>
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
          <Text style={[styles.sectionLabel, isDarkMode && styles.sectionLabelDark]}>
            Location:
          </Text>
          <View style={styles.chipsContainer}>
            {job.locations.map((loc, index) => (
              <View key={index.toString()} style={[styles.chip, isDarkMode && styles.chipDark]}>
                <Text style={[styles.chipText, isDarkMode && styles.chipTextDark]}>
                  {loc}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Tags Section with extra margin at bottom */}
      {job.tags && job.tags.length > 0 && (
        <View style={[styles.section, { marginBottom: 10 }]}>
          <Text style={[styles.sectionLabel, isDarkMode && styles.sectionLabelDark]}>
            TAGS:
          </Text>
          <View style={styles.chipsContainer}>
            {job.tags.map((tag, index) => (
              <View key={index.toString()} style={[styles.chip, isDarkMode && styles.chipDark]}>
                <Text style={[styles.chipText, isDarkMode && styles.chipTextDark]}>
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Toggle Full Description */}
      {showDescription ? (
        <>
          <HTMLDescription htmlContent={job.description || ''} />
          <TouchableOpacity
            style={[styles.actionButton, isDarkMode && styles.actionButtonDark]}
            onPress={toggleDescription}
          >
            <Text style={[styles.actionButtonText, isDarkMode && styles.actionButtonTextDark]}>
              Hide Details
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          style={[styles.actionButton, isDarkMode && styles.actionButtonDark]}
          onPress={toggleDescription}
        >
          <Text style={[styles.actionButtonText, isDarkMode && styles.actionButtonTextDark]}>
            View More Details
          </Text>
        </TouchableOpacity>
      )}

      {/* Action Buttons */}
      <View style={[styles.actionRow, { justifyContent: 'center' }]}>
        {onSave && (
          <TouchableOpacity
            style={[styles.actionButton, saved && styles.savedButton, isDarkMode && styles.actionButtonDark]}
            onPress={() => onSave(job)}
            disabled={saved}
          >
            <Text style={[styles.actionButtonText, isDarkMode && styles.actionButtonTextDark]}>
              {saved ? 'Saved' : 'Save Job'}
            </Text>
          </TouchableOpacity>
        )}
        {onApply && (
          <TouchableOpacity
            style={[styles.actionButton, isDarkMode && styles.actionButtonDark]}
            onPress={() => onApply(job)}
          >
            <Text style={[styles.actionButtonText, isDarkMode && styles.actionButtonTextDark]}>
              Apply
            </Text>
          </TouchableOpacity>
        )}
        {onRemove && (
          <TouchableOpacity
            style={[styles.actionButton, isDarkMode && styles.actionButtonDark]}
            onPress={() => onRemove(job)}
          >
            <Text style={[styles.actionButtonText, isDarkMode && styles.actionButtonTextDark]}>
              Remove
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default JobCard;

const styles = StyleSheet.create({
  // Card container
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
  },
  cardDark: {
    backgroundColor: '#1c1c1c',
  },

  // Header
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
    color: '#000',
  },
  titleDark: {
    color: '#FFF',
  },
  company: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  companyDark: {
    color: '#CCC',
  },

  // Details Section
  detailsSection: {
    marginVertical: 6,
  },
  detailText: {
    fontSize: 12,
    color: '#333',
    marginVertical: 2,
  },
  detailTextDark: {
    color: '#EEE',
  },
  detailLabel: {
    fontWeight: 'bold',
  },

  // Sections (Location, Tags)
  section: {
    marginVertical: 6,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  sectionLabelDark: {
    color: '#EEE',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: '#e0e0e0', // default chip color in light mode
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  chipDark: {
    backgroundColor: '#FFEB3B', // yellow chips in dark mode
  },
  chipText: {
    fontSize: 12,
    color: '#333',
  },
  chipTextDark: {
    color: '#000', // black text in dark mode
  },

  // Toggle / Action Button (for details toggle and Save/Apply/Remove)
  actionButton: {
    backgroundColor: '#007bff', // default blue in light mode
    padding: 10,
    borderRadius: 5,
    marginRight: 8,
    alignItems: 'center',
    minWidth: 80,
  },
  actionButtonDark: {
    backgroundColor: '#FFEB3B', // yellow button in dark mode
  },
  actionButtonText: {
    color: '#FFF', // white text in light mode
    fontSize: 14,
  },
  actionButtonTextDark: {
    color: '#000', // black text in dark mode
    fontSize: 14,
  },

  // Toggle Button (reuse actionButton style)
  toggleButton: {
    alignSelf: 'flex-start',
  },

  // Action Row
  actionRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
});
