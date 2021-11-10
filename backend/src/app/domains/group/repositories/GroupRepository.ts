import { getRepository, Repository } from 'typeorm';
import ICreateGroupDTO from '../dtos/ICreateGroupDTO';
import Group from '../entities/Group';
import IGroupRepository from './models/IGroupRepository';

class GroupRepository implements IGroupRepository {
  private ormRepository: Repository<Group>;

  constructor() {
    this.ormRepository = getRepository(Group);
  }

  public async count(): Promise<number> {
    return this.ormRepository.count();
  }

  public async create({
    name,
    description,
  }: ICreateGroupDTO): Promise<Group> {
    const group = this.ormRepository.create({
      name,
      description,
    });
    await this.ormRepository.save(group);

    return group;
  }

  public async delete(id: string): Promise<boolean> {
    await this.ormRepository.softDelete(id);
    return true;
  }

  public async find(id: string): Promise<Group | undefined> {
    const group = await this.ormRepository.findOne(id, {
      relations: ['queues'],
    });
    return group;
  }

  public async findAll(
    page?: number,
    size?: number,
  ): Promise<Group[]> {
    return this.ormRepository.find({
      order: {
        createdAt: 'ASC',
      },
      take: size || undefined,
      skip: (page && size) ? (page - 1) * size : undefined,
    });
  }

  public async findByIds(ids: string[]): Promise<Group[]> {
    return this.ormRepository.findByIds(ids, {
      order: {
        createdAt: 'ASC',
      },
    });
  }

  public async findByName(name: string): Promise<Group | undefined> {
    const group = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return group;
  }

  public async save(group: Group): Promise<Group> {
    return this.ormRepository.save(group);
  }
}

export default GroupRepository;
