import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { JobState } from '../../../../providers/QueueProvider/types';
import CloneJobService from '../../../job/services/CloneJobService';
import CreateJobService from '../../../job/services/CreateJobService';
import DeleteJobService from '../../../job/services/DeleteJobService';
import ListJobService from '../../../job/services/ListJobService';
import RetryJobService from '../../../job/services/RetryJobService';
import CreateQueueService from '../../services/CreateQueueService';
import DeleteQueueService from '../../services/DeleteQueueService';
import ListQueueService from '../../services/ListQueueService';
import PauseQueueService from '../../services/PauseQueueService';
import ResumeQueueService from '../../services/ResumeQueueService';
import ShowQueueService from '../../services/ShowQueueService';
import UpdateQueueService from '../../services/UpdateQueueService';

class QueueController {
  public async cloneJob(request: Request, response: Response): Promise<Response> {
    const {
      id: queueId,
      jobId,
    } = request.params;
    const cloneJob = container.resolve(CloneJobService);
    const result = await cloneJob.execute({
      queueId,
      jobId,
    });
    return response.json(result);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      host,
      port,
      groupId,
    } = request.body;
    const createQueue = container.resolve(CreateQueueService);
    const queue = await createQueue.execute({
      name,
      description,
      host,
      port,
      groupId,
    });
    return response.json(classToClass(queue));
  }

  public async createJob(request: Request, response: Response): Promise<Response> {
    const {
      id: queueId,
    } = request.params;
    const {
      data,
    } = request.body;
    const createJob = container.resolve(CreateJobService);
    const result = await createJob.execute({
      queueId,
      data,
    });
    return response.json(result);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const {
      id,
    } = request.params;
    const deleteQueue = container.resolve(DeleteQueueService);
    const result = await deleteQueue.execute({
      id,
    });
    return response.json(result);
  }

  public async deleteJob(request: Request, response: Response): Promise<Response> {
    const {
      id: queueId,
    } = request.params;
    const {
      jobIds,
    } = request.body;
    const deleteJob = container.resolve(DeleteJobService);
    const result = await deleteJob.execute({
      queueId,
      jobIds,
    });
    return response.json(result);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const {
      groupId,
    } = request.query;
    const listQueue = container.resolve(ListQueueService);
    const queues = await listQueue.execute({
      groupId: String(groupId),
    });
    return response.json(classToClass(queues));
  }

  public async listJobs(request: Request, response: Response): Promise<Response> {
    const {
      id: queueId,
    } = request.params;
    const {
      state,
      page,
      size,
    } = request.query;
    const listJob = container.resolve(ListJobService);
    const result = await listJob.execute({
      queueId,
      state: state as JobState,
      page: Number(page),
      size: Number(size),
    });
    return response.json(result);
  }

  public async pause(request: Request, response: Response): Promise<Response> {
    const {
      id,
    } = request.params;
    const pauseQueue = container.resolve(PauseQueueService);
    const result = await pauseQueue.execute({
      id,
    });
    return response.json(result);
  }

  public async resume(request: Request, response: Response): Promise<Response> {
    const {
      id,
    } = request.params;
    const resumeQueue = container.resolve(ResumeQueueService);
    const result = await resumeQueue.execute({
      id,
    });
    return response.json(result);
  }

  public async retryJobs(request: Request, response: Response): Promise<Response> {
    const {
      id: queueId,
    } = request.params;
    const {
      jobIds,
    } = request.body;
    const retryJob = container.resolve(RetryJobService);
    const result = await retryJob.execute({
      queueId,
      jobIds,
    });
    return response.json(result);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const {
      id,
    } = request.params;
    const showQueue = container.resolve(ShowQueueService);
    const queue = await showQueue.execute({
      id,
    });
    return response.json(classToClass(queue));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      id,
    } = request.params;
    const {
      name,
      description,
      host,
      port,
      groupId,
    } = request.body;
    const updateQueue = container.resolve(UpdateQueueService);
    const queue = await updateQueue.execute({
      id,
      name,
      description,
      host,
      port,
      groupId,
    });
    return response.json(classToClass(queue));
  }
}

export default QueueController;
