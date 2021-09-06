import { inject, injectable } from 'tsyringe';
import IQueueProvider from '../../../providers/QueueProvider/models/IQueueProvider';
import Queue from '../../queue/entities/Queue';
import IQueueRepository from '../../queue/repositories/models/IQueueRepository';
import BullQueueProvider from '../../../providers/QueueProvider/BullQueueProvider';
import CustomError from '../../../errors/CustomError';
import Group from '../entities/Group';
import IGroupRepository from '../repositories/models/IGroupRepository';

interface IDashboard {
  group: Group,
  queues: Queue[],
}

@injectable()
class ShowGroupDashboardService {
  constructor(
    @inject('GroupRepository')
    private groupRepository: IGroupRepository,

    @inject('QueueRepository')
    private queueRepository: IQueueRepository,
  ) {}

  public async execute(groupId: string): Promise<IDashboard> {
    const group = await this.groupRepository.find(groupId);

    if (!group) {
      throw new CustomError('Group not found.', 404);
    }

    const queues = await this.queueRepository.findByGroup(groupId);
    const describedQueues = await Promise.all(
      queues.map(async (queue) => {
        const queueProvider = this.newBullQueueProvider(queue);
        const describedQueue = await queueProvider.describe();
        await queueProvider.close();

        return describedQueue;
      }),
    );

    return {
      group,
      queues: describedQueues,
    };
  }

  public newBullQueueProvider(queue: Queue): IQueueProvider {
    return new BullQueueProvider(queue);
  }
}

export default ShowGroupDashboardService;
