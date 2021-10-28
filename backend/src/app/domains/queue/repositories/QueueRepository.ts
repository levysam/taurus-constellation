import { getRepository, Repository } from 'typeorm';
import ICreateQueueDTO from '../dtos/ICreateQueueDTO';
import Queue from '../entities/Queue';
import IQueueRepository from './models/IQueueRepository';

class QueueRepository implements IQueueRepository {
  private ormRepository: Repository<Queue>;

  constructor() {
    this.ormRepository = getRepository(Queue);
  }

  public async create({
    name,
    description,
    host,
    port,
    groupId,
  }: ICreateQueueDTO): Promise<Queue> {
    const queue = this.ormRepository.create({
      name,
      description,
      host,
      port,
      groupId,
    });
    await this.ormRepository.save(queue);
    return queue;
  }

  public async delete(id: string): Promise<boolean> {
    await this.ormRepository.softDelete(id);
    return true;
  }

  public async find(id: string): Promise<Queue | undefined> {
    const queue = await this.ormRepository.findOne(id);
    return queue;
  }

  public async findAll(): Promise<Queue[]> {
    const queues = await this.ormRepository.find({
      relations: ['group'],
      order: {
        id: 'ASC',
      },
    });
    return queues;
  }

  public async findByGroup(groupId: string): Promise<Queue[]> {
    if (!groupId) {
      return this.ormRepository.find();
    }

    const queues = await this.ormRepository.find({
      where: {
        groupId,
      },
      order: {
        id: 'ASC',
      },
    });
    return queues;
  }

  public async findByIds(ids: string[]): Promise<Queue[]> {
    const queues = await this.ormRepository.findByIds(ids, {
      order: {
        id: 'ASC',
      },
    });
    return queues;
  }

  public async save(queue: Queue): Promise<Queue> {
    return this.ormRepository.save(queue);
  }
}

export default QueueRepository;
