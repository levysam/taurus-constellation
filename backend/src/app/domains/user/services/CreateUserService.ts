import { injectable, inject } from 'tsyringe';
import CustomError from '../../../errors/CustomError';
import GroupRepository from '../../group/repositories/GroupRepository';
import User from '../entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUserRepository from '../repositories/models/IUserRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  role: string;
  groupIds: string[];
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('GroupRepository')
    private groupRepository: GroupRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    role,
    groupIds,
  }: IRequest): Promise<User | undefined> {
    const userExists = await this.userRepository.findByEmail(email);
    if (userExists) {
      throw new CustomError('User already exists', 400);
    }

    const hashedPassword = await this.hashProvider.generate(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const groups = await this.groupRepository.findByIds(groupIds);
    user.groups = groups;

    await this.userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
