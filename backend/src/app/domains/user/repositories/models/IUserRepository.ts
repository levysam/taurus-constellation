import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../../entities/User';

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  delete(id: string): Promise<boolean>;
  find(id: string): Promise<User | undefined>;
  findAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
}

export default IUserRepository;
