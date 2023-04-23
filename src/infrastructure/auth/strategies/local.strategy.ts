import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInUsecase } from 'src/usecases/auth/sign-in.usecase';
import { AuthUsecasesProxyModule } from 'src/infrastructure/usecases-proxy/auth-usecases-proxy.module';
import { UsecaseProxy } from 'src/infrastructure/usecases-proxy/usecase-proxy';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AuthUsecasesProxyModule.SIGN_IN_USECASE_PROXY)
    private readonly signInUsecaseProxy: UsecaseProxy<SignInUsecase>,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.signInUsecaseProxy
      .getInstance()
      .execute(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
