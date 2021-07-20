import { inject, injectable } from 'tsyringe';
import BullQueueProvider from '../../../providers/QueueProvider/BullQueueProvider';
import IQueueProvider from '../../../providers/QueueProvider/models/IQueueProvider';
import Queue from '../entities/Queue';
import IQueueRepository from '../repositories/models/IQueueRepository';

interface IRequest {
  groupId: string;
}

@injectable()
class ListQueueService {
  constructor(
    @inject('QueueRepository')
    private queueRepository: IQueueRepository,
  ) {}

  public async execute({
    groupId,
  }: IRequest): Promise<Queue[]> {
    const queues = await this.queueRepository.findByGroup(groupId);

    const describedQueues = await Promise.all(queues.map(async (queue) => {
      const queueProvider = this.newQueueProvider(queue);
      const describedQueue = await queueProvider.describe();
      await queueProvider.close();
      return describedQueue;
    }));

    return describedQueues;
  }

  private newQueueProvider(queue: Queue): IQueueProvider {
    return new BullQueueProvider(queue);
  }
}

export default ListQueueService;
