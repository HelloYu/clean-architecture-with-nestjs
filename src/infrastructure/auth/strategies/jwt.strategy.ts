import {
  Injectable,
  Inject,
  LoggerService,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthUsecasesProxyModule } from 'src/infrastructure/usecases-proxy/auth-usecases-proxy.module';
import { UsecaseProxy } from 'src/infrastructure/usecases-proxy/usecase-proxy';
import { SignInUsecase } from 'src/usecases/auth/sign-in.usecase';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AuthUsecasesProxyModule.SIGN_IN_USECASE_PROXY)
    private readonly signInUsecaseProxy: UsecaseProxy<SignInUsecase>,
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: config.get('jwt.SECRET'),
    });
  }

  async validate(payload: any) {
    const user = this.signInUsecaseProxy
      .getInstance()
      .validateUserForJwtStragtegy(payload.username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
