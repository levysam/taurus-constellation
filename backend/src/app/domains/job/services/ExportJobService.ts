import { inject, injectable } from 'tsyringe';
import CustomError from '../../../errors/CustomError';
import BullQueueProvider from '../../../providers/QueueProvider/BullQueueProvider';
import IQueueProvider from '../../../providers/QueueProvider/models/IQueueProvider';
import Queue from '../../queue/entities/Queue';
import IQueueRepository from '../../queue/repositories/models/IQueueRepository';

interface IRequest {
  queueId: string;
  jobId: string;
}

interface IResponse {
  filename: string;
  content: string;
}

@injectable()
class ExportJobService {
  constructor(
    @inject('QueueRepository')
    private queueRepository: IQueueRepository,
  ) {}

  public async execute({
    queueId,
    jobId,
  }: IRequest): Promise<IResponse> {
    const queue = await this.queueRepository.find(queueId);
    if (!queue) {
      throw new CustomError('Queue not found', 404);
    }

    const queueProvider = this.newQueueProvider(queue);
    const content = await queueProvider.exportJob(jobId);
    await queueProvider.close();

    if (!content) {
      throw new CustomError('Job not found', 404);
    }

    const filename = `queue_${queueId}-job_${jobId}.json`;

    return {
      filename,
      content,
    };
  }

  private newQueueProvider(queue: Queue): IQueueProvider {
    return new BullQueueProvider(queue);
  }
}

export default ExportJobService;
