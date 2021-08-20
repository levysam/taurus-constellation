import { inject, injectable } from 'tsyringe';
import Queue from '../entities/Queue';
import IQueueRepository from '../repositories/models/IQueueRepository';

@injectable()
class ListQueueService {
  constructor(
    @inject('QueueRepository')
    private queueRepository: IQueueRepository,
  ) {}

  public async execute(): Promise<Queue[]> {
    const queues = await this.queueRepository.findAll();
    return queues;
  }
}

export default ListQueueService;
