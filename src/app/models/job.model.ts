export interface Job {
  jobId: number;
  companyName: string;  // ✅ Correct key
  jobRole: string;
  jobDescription: string;
  applicationDeadline: string;
}