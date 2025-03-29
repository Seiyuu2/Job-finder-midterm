// NON POSTMAN HARDCODED TEST STUFF
import { v4 as uuidv4 } from 'uuid';

export type Job = {
  id: string;
  title: string;
  companyName: string;
  salary?: string;
  description?: string;

};

export const fetchJobs = async (): Promise<Job[]> => {
  // Hardcoded test data
  return [
    {
      id: uuidv4(),
      title: 'Test Job Title',
      companyName: 'Test Company',
      salary: '$50,000',
      description: 'This is a test job description for verifying the UI.',
    },
    {
      id: uuidv4(),
      title: 'Sample Developer',
      companyName: 'Sample Inc.',
      salary: '$60,000',
      description: 'Looking for a skilled developer with expertise in React Native.',
    },
  ];
};
