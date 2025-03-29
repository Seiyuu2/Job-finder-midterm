// src/api/jobApi.ts
import uuid from 'react-native-uuid';

export type Job = {
  id: string;
  title: string;
  companyName: string;
  salary?: string;
  description?: string;
  // You can add additional properties here if needed
};

export const fetchJobs = async (): Promise<Job[]> => {
  try {
    const response = await fetch('https://empllo.com/api/v1');
    const data = await response.json();
    console.log('Fetched data:', data);

    // Check if data is an array or if jobs are in data.jobs
    const jobsArray = Array.isArray(data) ? data : data.jobs;
    if (!jobsArray) {
      throw new Error("No jobs array found in the response");
    }
    
    return jobsArray.map((job: any) => ({
      id: job.id ? job.id.toString() : uuid.v4(),
      title: job.title || "",
      companyName: job.companyName || "",
      salary: job.salary || "",
      description: job.description || "",
      // Map other fields if necessary...
    }));
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
};
