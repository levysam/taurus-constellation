export type QueueStatus = 'running' | 'paused';

export type QueueJobCounts = {
  waiting: number;
  paused: number;
  active: number;
  delayed: number;
  failed: number;
  completed: number;
};

export type JobState = 'waiting' | 'active' | 'delayed' | 'failed' | 'completed';

export type Job = {
  id: string;
  data: any;
  attemptsMade: number;
  name: string;
  timestamp: number;
  dateTime: string;
  state: JobState;
};

export default QueueStatus;
