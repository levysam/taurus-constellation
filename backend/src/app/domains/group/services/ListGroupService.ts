import { inject, injectable } from 'tsyringe';
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

@injectable()
class ListGroupService {
  constructor(
    @inject('GroupRepository')
    private groupRepository: IGroupRepository,
  ) {}

  public async execute({
    user,
  }: IRequest): Promise<Group[]> {
    if (user.role !== 'administrator') {
      return this.groupRepository.findByIds(user.groupIds);
    }

    return this.groupRepository.findAll();
  }
}

export default ListGroupService;
