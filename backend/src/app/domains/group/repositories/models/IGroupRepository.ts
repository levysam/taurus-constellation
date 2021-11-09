import ICreateGroupDTO from '../../dtos/ICreateGroupDTO';
import Group from '../../entities/Group';

interface IGroupRepository {
  count(): Promise<number>;
  create(data: ICreateGroupDTO): Promise<Group>;
  delete(id: string): Promise<boolean>;
  find(id: string): Promise<Group | undefined>;
  findAll(page?: number, size?: number): Promise<Group[]>;
  findByIds(ids: string[]): Promise<Group[]>;
  findByName(name: string): Promise<Group | undefined>;
  save(group: Group): Promise<Group>;
}

export default IGroupRepository;
