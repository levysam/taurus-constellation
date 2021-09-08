import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import CustomError from '../../../errors/CustomError';
import User from '../entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUserRepository from '../repositories/models/IUserRepository';
import authConfig from '../../../../config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
  }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new CustomError('Incorrect email or password', 401);
    }

    const passwordCompare = await this.hashProvider.compare(
      password,
      user.password,
    );

    if (!passwordCompare) {
      throw new CustomError('Incorrect email or password', 401);
    }

    const {
      secret,
      expiresIn,
    } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
