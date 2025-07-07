export interface Application {
  applicationId: number;
  studentId: number;
  jobId: number;
  jobRole: string;
  companyName: string;
  applicationDeadline: string;
  status: string;
  interviewNotification: boolean;
  response: string | null;
}
export interface ApplicationDTO {
  applicationId: number;
  studentId: number;
  jobId: number;
  jobRole: string;
  companyName: string;
  applicationDeadline: string;
  status: string;
  interviewNotification: boolean;
  response: string | null;
}