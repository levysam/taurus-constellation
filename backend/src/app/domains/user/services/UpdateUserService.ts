import { injectable, inject } from 'tsyringe';
import CustomError from '../../../errors/CustomError';
import User from '../entities/User';
import IUserRepository from '../repositories/models/IUserRepository';

interface IRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    id,
    name,
    email,
    password,
    role,
  }: IRequest): Promise<User> {
    const user = await this.userRepository.find(id);
    if (!user) {
      throw new CustomError('User not found', 404);
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    user.role = role || user.role;

    return user;
  }
}

export default UpdateUserService;
