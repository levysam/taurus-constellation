import { injectable, inject } from 'tsyringe';
import User from '../entities/User';
import IUserRepository from '../repositories/models/IUserRepository';

@injectable()
class ListUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users;
  }
}

export default ListUserService;
