// src/api/jobApi.ts
import { v4 as uuidv4 } from 'uuid';

export type Job = {
  id: string;
  title: string;
  companyName: string;
  salary?: string;
  description?: string;
  // add other properties as needed
};

export const fetchJobs = async (): Promise<Job[]> => {
  try {
    const response = await fetch('https://empllo.com/api/v1');
    const data = await response.json();
    console.log('Fetched data:', data); // Check what you're getting
    // Extract the jobs array from the response
    const jobs = data.jobs || [];
    return jobs.map((job: Omit<Job, 'id'>) => ({
      ...job,
      id: uuidv4(),
    }));
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
};
