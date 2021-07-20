import { inject, injectable } from 'tsyringe';
import Group from '../entities/Group';
import IGroupRepository from '../repositories/models/IGroupRepository';

@injectable()
class ListGroupService {
  constructor(
    @inject('GroupRepository')
    private groupRepository: IGroupRepository,
  ) {}

  public async execute(): Promise<Group[]> {
    const groups = await this.groupRepository.findAll();
    return groups;
  }
}

export default ListGroupService;
