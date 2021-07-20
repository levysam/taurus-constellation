import ICreateQueueDTO from '../../dtos/ICreateQueueDTO';
import Queue from '../../entities/Queue';

interface IQueueRepository {
  create(data: ICreateQueueDTO): Promise<Queue>;
  delete(id: string): Promise<boolean>;
  find(id: string): Promise<Queue | undefined>;
  findAll(): Promise<Queue[]>;
  findByGroup(groupId: string): Promise<Queue[]>;
  save(queue: Queue): Promise<Queue>;
}

export default IQueueRepository;
