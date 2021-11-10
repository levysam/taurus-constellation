import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../../entities/User';

interface IUserRepository {
  count(): Promise<number>;
  create(data: ICreateUserDTO): Promise<User>;
  delete(id: string): Promise<boolean>;
  find(id: string): Promise<User | undefined>;
  findAll(page?: number, size?: number): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
}

export default IUserRepository;
