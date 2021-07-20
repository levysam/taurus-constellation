import { inject, injectable } from 'tsyringe';
import CustomError from '../../../errors/CustomError';
import Queue from '../entities/Queue';
import IQueueProvider from '../../../providers/QueueProvider/models/IQueueProvider';
import IQueueRepository from '../repositories/models/IQueueRepository';
import BullQueueProvider from '../../../providers/QueueProvider/BullQueueProvider';

interface IRequest {
  id: string;
}

@injectable()
class ShowQueueService {
  constructor(
    @inject('QueueRepository')
    private queueRepository: IQueueRepository,
  ) {}

  public async execute({
    id,
  }: IRequest): Promise<Queue> {
    const queue = await this.queueRepository.find(id);
    if (!queue) {
      throw new CustomError('Queue not found', 404);
    }

    const queueProvider = this.newQueueProvider(queue);
    const describedQueue = await queueProvider.describe();
    await queueProvider.close();

    return describedQueue;
  }

  private newQueueProvider(queue: Queue): IQueueProvider {
    return new BullQueueProvider(queue);
  }
}

export default ShowQueueService;
