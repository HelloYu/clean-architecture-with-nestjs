import {
  Body,
  Controller,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserMapper } from 'src/infrastructure/mappers/user.mapper';
import { AuthUsecasesProxyModule } from 'src/infrastructure/usecases-proxy/auth-usecases-proxy.module';
import { UsecaseProxy } from 'src/infrastructure/usecases-proxy/usecase-proxy';
import { SignInUsecase } from 'src/usecases/auth/sign-in.usecase';
import { SignInRequestDto } from './sign-in-request.dto';
import { Response, Request } from 'express';
import { LocalAuthGuard } from 'src/infrastructure/auth/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(UserMapper)
    private readonly userMapper: UserMapper,
    @Inject(AuthUsecasesProxyModule.SIGN_IN_USECASE_PROXY)
    private readonly signInUseCaseProxy: UsecaseProxy<SignInUsecase>,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(
    @Body() signInDto: SignInRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessTokenCookie = await this.signInUseCaseProxy
      .getInstance()
      .getCookieWithJwtToken(signInDto.username);
    const refreshTokenCookie = await this.signInUseCaseProxy
      .getInstance()
      .getCookieWithJwtRefreshToken(signInDto.username);

    res.set('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);

    return;
  }
}
