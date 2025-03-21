// src/api/jobApi.ts
import { v4 as uuidv4 } from 'uuid';

export type Job = {
  id: string;
  title: string;
  company: string;
  salary: string;
  description?: string;
  [key: string]: any;
};

export const fetchJobs = async (): Promise<Job[]> => {
  try {
    const response = await fetch('https://empllo.com/api/v1');
    const jobs = await response.json();
    // Assign unique IDs to each job
    return jobs.map((job: Omit<Job, 'id'>) => ({
      ...job,
      id: uuidv4(),
    }));
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
};
