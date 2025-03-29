companyName: string;

 
  salary?: string;
 
  description?: string;
 

  // You can add additional properties here if needed
 

  tags?: string[]; // Added tags field
 
};
 

 
export const fetchJobs = async (): Promise<Job[]> => {

@@ -28,7 +28,7 @@ export const fetchJobs = async (): Promise<Job[]> => {
 
      companyName: job.companyName || "",
 
      salary: job.salary || "",
 
      description: job.description || "",
 

      // Map other fields if necessary...
 

      tags: Array.isArray(job.tags) ? job.tags : [],
 
    }));
 
  } catch (error) {
 
    console.error('Error fetching jobs:', error);