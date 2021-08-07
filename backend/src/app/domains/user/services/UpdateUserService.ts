import { injectable, inject } from 'tsyringe';
import CustomError from '../../../errors/CustomError';
import IGroupRepository from '../../group/repositories/models/IGroupRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUserRepository from '../repositories/models/IUserRepository';
import User from '../entities/User';

interface IRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  groupIds?: string[];
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('GroupRepository')
    private groupRepository: IGroupRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    id,
    name,
    email,
    password,
    role,
    groupIds,
  }: IRequest): Promise<User> {
    const user = await this.userRepository.find(id);
    if (!user) {
      throw new CustomError('User not found', 404);
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    if (groupIds) {
      user.groups = await this.groupRepository.findByIds(groupIds);
    }

    if (password) {
      user.password = await this.hashProvider.generate(password);
    }

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
