import { IJwtConfig } from 'src/domain/config/jwt-config.interface';
import { UserModel } from 'src/domain/models/user.model';
import { IUserRepository } from 'src/domain/repositories/user-repository.interface';
import { IBcryptService } from 'src/domain/services/bcrypt.interface';
import {
  IJwtService,
  IJwtServicePayload,
} from 'src/domain/services/jwt.interface';

export class SignInUsecase {
  constructor(
    private readonly repository: IUserRepository,
    private readonly bcryptService: IBcryptService,
    private readonly jwtTokenService: IJwtService,
    private readonly jwtConfig: IJwtConfig,
  ) {}

  async execute(
    username: string,
    password: string,
  ): Promise<Omit<UserModel, 'password'>> {
    const user = await this.repository.findByUsername(username);
    if (!user) {
      return null;
    }
    const match = await this.bcryptService.compare(password, user.password);
    if (user && match) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async getCookieWithJwtToken(username: string): Promise<string> {
    const payload: IJwtServicePayload = { username: username };
    const secret = this.jwtConfig.SECRET;
    const expiresIn = this.jwtConfig.EXPIRATION_TIME;
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
    const cookie = `Authentication=${token}; HttpOnly; Path=/; Max-Age=${expiresIn}`;
    return cookie;
  }

  async getCookieWithJwtRefreshToken(username: string): Promise<string> {
    const payload: IJwtServicePayload = { username: username };
    const secret = this.jwtConfig.REFRESH_TOKEN_SECRET;
    const expiresIn = this.jwtConfig.REFRESH_TOKEN_EXPIRATION_TIME;
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${expiresIn}`;
    return cookie;
  }

  async validateUserForJwtStragtegy(
    username: string,
  ): Promise<Omit<UserModel, 'password'>> {
    const user = await this.repository.findByUsername(username);
    if (!user) {
      return null;
    }
    const { password, ...result } = user;
    return result;
  }
}
