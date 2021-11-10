import { inject, injectable } from 'tsyringe';
import IQueueProvider from '../../../providers/QueueProvider/models/IQueueProvider';
import Queue from '../../queue/entities/Queue';
import IQueueRepository from '../../queue/repositories/models/IQueueRepository';
import BullQueueProvider from '../../../providers/QueueProvider/BullQueueProvider';
import Group from '../entities/Group';
import IGroupRepository from '../repositories/models/IGroupRepository';

interface IUser {
  id: string;
  role: string;
  groupIds: string[];
}

interface IRequest {
  user: IUser;
}

interface IDashboardItem {
  group: Group,
  queues: Queue[],
}

@injectable()
class ListGroupDashboardService {
  constructor(
    @inject('GroupRepository')
    private groupRepository: IGroupRepository,

    @inject('QueueRepository')
    private queueRepository: IQueueRepository,
  ) {}

  public async execute({
    user,
  }: IRequest): Promise<IDashboardItem[]> {
    const groups = await this.getGroups(user);
    const dashboard: IDashboardItem[] = [];

    for (const group of groups) {
      const queues = await this.queueRepository.findByGroup(group.id);
      const describedQueues = await Promise.all(
        queues.map(async (queue) => {
          const queueProvider = this.newBullQueueProvider(queue);
          const describedQueue = await queueProvider.describe();
          await queueProvider.close();

          return describedQueue;
        }),
      );

      dashboard.push({
        group,
        queues: describedQueues,
      });
    }

    return dashboard;
  }

  public async getGroups(user: IUser): Promise<Group[]> {
    if (user.role === 'administrator') {
      return this.groupRepository.findAll();
    }
    return this.groupRepository.findByIds(user.groupIds);
  }

  public newBullQueueProvider(queue: Queue): IQueueProvider {
    return new BullQueueProvider(queue);
  }
}

export default ListGroupDashboardService;
