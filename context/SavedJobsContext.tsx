import React, { createContext, useState, ReactNode } from 'react';
import { Job } from '../api/jobApi(HARDCODEDTESTDATA)';

type SavedJobsContextType = {
  savedJobs: Job[];
  addJob: (job: Job) => void;
  removeJob: (jobId: string) => void;
};

export const SavedJobsContext = createContext<SavedJobsContextType>({
  savedJobs: [],
  addJob: () => {},
  removeJob: () => {},
});

export const SavedJobsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);

  const addJob = (job: Job) => {
    setSavedJobs((prev) => {
      if (prev.some((j) => j.id === job.id)) return prev;
      return [...prev, job];
    });
  };

  const removeJob = (jobId: string) => {
    setSavedJobs((prev) => prev.filter((job) => job.id !== jobId));
  };

  return (
    <SavedJobsContext.Provider value={{ savedJobs, addJob, removeJob }}>
      {children}
    </SavedJobsContext.Provider>
  );
};
