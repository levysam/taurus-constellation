import { inject, injectable } from 'tsyringe';
import IQueueProvider from '../../../providers/QueueProvider/models/IQueueProvider';
import IGroupRepository from '../../group/repositories/models/IGroupRepository';
import Queue from '../../queue/entities/Queue';
import IQueueRepository from '../../queue/repositories/models/IQueueRepository';
import BullQueueProvider from '../../../providers/QueueProvider/BullQueueProvider';
import Group from '../../group/entities/Group';

interface IDashboardItem {
  group: Group,
  queues: Queue[],
}

type IDashboard = IDashboardItem[];

@injectable()
class ShowDashboardService {
  constructor(
    @inject('GroupRepository')
    private groupRepository: IGroupRepository,

    @inject('QueueRepository')
    private queueRepository: IQueueRepository,
  ) {}

  public async execute(): Promise<IDashboard> {
    const groups = await this.groupRepository.findAll();
    const dashboard = [];

    for await (const group of groups) {
      const queues = await this.queueRepository.findByGroup(group.id);
      const describedQueues = [];

      for await (const queue of queues) {
        const bullQueue = this.newBullQueueProvider(queue);
        const describedQueue = await bullQueue.describe();
        describedQueues.push(describedQueue);
      }

      dashboard.push({
        group,
        queues: describedQueues,
      });
    }

    return dashboard;
  }

  public newBullQueueProvider(queue: Queue): IQueueProvider {
    return new BullQueueProvider(queue);
  }
}

export default ShowDashboardService;
