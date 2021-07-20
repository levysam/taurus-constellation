import { inject, injectable } from 'tsyringe';
import CustomError from '../../../errors/CustomError';
import IGroupRepository from '../repositories/models/IGroupRepository';

@injectable()
class DeleteGroupService {
  constructor(
    @inject('GroupRepository')
    private groupRepository: IGroupRepository,
  ) {}

  public async execute(id: string): Promise<boolean> {
    const group = await this.groupRepository.find(id);
    if (!group) {
      throw new CustomError('Group not found', 404);
    }

    const result = await this.groupRepository.delete(id);

    return result;
  }
}

export default DeleteGroupService;
