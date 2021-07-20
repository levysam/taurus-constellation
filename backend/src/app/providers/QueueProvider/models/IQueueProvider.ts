import Queue from '../../../domains/queue/entities/Queue';
import {
  Job, JobState, QueueJobCounts, QueueStatus,
} from '../types';

interface IQueueProvider {
  addJob(data: any): Promise<boolean>;
  cloneJob(jobId: string): Promise<boolean>;
  close(): Promise<void>;
  deleteJobs(jobIds: string[]): Promise<boolean>;
  describe(): Promise<Queue>;
  getJob(jobId: string): Promise<Job>;
  getJobCounts(): Promise<QueueJobCounts>;
  getJobCountsByState(state: JobState): Promise<number>;
  getStatus(): Promise<QueueStatus>;
  listJobs(state: JobState, start: number, end: number): Promise<Job[]>;
  pause(): Promise<boolean>;
  resume(): Promise<boolean>;
  retryJobs(jobIds: string[]): Promise<boolean>;
}

export default IQueueProvider;
