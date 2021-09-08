import Bull from 'bull';
import { ulid } from 'ulid';
import moment from 'moment';
import Queue from '../../domains/queue/entities/Queue';
import IQueueProvider from './models/IQueueProvider';
import {
  Job, JobState, QueueJobCounts, QueueStatus,
} from './types';

class BullQueueProvider implements IQueueProvider {
  private queue: Queue;

  private bullQueue: Bull.Queue;

  constructor(queue: Queue) {
    this.queue = queue;
    this.bullQueue = new Bull(queue.name, {
      redis: {
        host: queue.host,
        port: queue.port,
      },
    });
  }

  public async addJob(data: any): Promise<boolean> {
    await this.bullQueue.add(
      'process',
      data,
      {
        jobId: ulid(),
        removeOnComplete: false,
        removeOnFail: false,
      },
    );
    return true;
  }

  public async cloneJob(jobId: string): Promise<boolean> {
    const job = await this.bullQueue.getJob(jobId);
    if (!job) {
      return false;
    }
    const { data } = job;
    await this.addJob(data);
    return true;
  }

  public async close(): Promise<void> {
    this.bullQueue.close();
  }

  public async deleteJobs(jobIds: string[]): Promise<boolean> {
    await Promise.all(jobIds.map(async (jobId) => {
      const job = await this.bullQueue.getJob(jobId);
      if (job) {
        await job.remove();
      }
    }));
    return true;
  }

  public async describe(): Promise<Queue> {
    this.queue.status = await this.getStatus();
    this.queue.jobCounts = await this.getJobCounts();
    return this.queue;
  }

  public async getJob(jobId: string): Promise<Job | undefined> {
    const job = await this.bullQueue.getJob(jobId);
    if (!job) {
      return undefined;
    }

    const state = await job.getState();

    return {
      id: job.id,
      data: job.data,
      attemptsMade: job.attemptsMade,
      name: job.name,
      timestamp: job.timestamp,
      dateTime: moment(job.timestamp || 0).format('YYYY-MM-DD H:m:s'),
      state,
    } as Job;
  }

  public async getJobCounts(): Promise<QueueJobCounts> {
    const jobCounts = await this.bullQueue.getJobCounts();
    const isPaused = await this.bullQueue.isPaused();
    return {
      waiting: isPaused ? 0 : jobCounts.waiting,
      paused: isPaused ? jobCounts.waiting : 0,
      active: jobCounts.active,
      delayed: jobCounts.delayed,
      failed: jobCounts.failed,
      completed: jobCounts.completed,
    };
  }

  public async getJobCountsByState(state: JobState): Promise<number> {
    const jobCounts = await this.bullQueue.getJobCountByTypes(state);
    return Number(jobCounts);
  }

  public async getStatus(): Promise<QueueStatus> {
    const isPaused = await this.bullQueue.isPaused();
    return isPaused ? 'paused' : 'running';
  }

  public async listJobs(state: JobState, start: number, end: number): Promise<Job[]> {
    const jobs = await this.bullQueue.getJobs(
      [state],
      start,
      end,
    );
    return jobs.map((job) => ({
      id: job.id.toString(),
      data: job.data,
      attemptsMade: job.attemptsMade,
      name: job.name,
      timestamp: job.timestamp,
      dateTime: moment(job.timestamp || 0).format('YYYY-MM-DD H:m:s'),
      state,
    }));
  }

  public async pause(): Promise<boolean> {
    await this.bullQueue.pause();
    return true;
  }

  public async resume(): Promise<boolean> {
    await this.bullQueue.resume();
    return true;
  }

  public async retryJobs(jobIds: string[]): Promise<boolean> {
    await Promise.all(jobIds.map(async (jobId) => {
      const job = await this.bullQueue.getJob(jobId);
      if (job) {
        await job.retry();
      }
    }));
    return true;
  }
}

export default BullQueueProvider;
