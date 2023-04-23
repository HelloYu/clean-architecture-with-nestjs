import { DynamicModule, Module } from '@nestjs/common';
import { UsecaseProxy } from './usecase-proxy';
import { GetUsersUsecase } from 'src/usecases/user/get-users.usecase';
import { MongooseRepositoriesModule } from '../repositories/mongoose/mongoose-repositories.module';
import { UserRepository } from '../repositories/mongoose/user.repository';
import { SignInUsecase } from 'src/usecases/auth/sign-in.usecase';
import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { JwtModule } from '../services/jwt/jwt.module';
import { JwtTokenService } from '../services/jwt/jwt.service';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [MongooseRepositoriesModule, BcryptModule, JwtModule],
})
export class AuthUsecasesProxyModule {
  static SIGN_IN_USECASE_PROXY = 'SignInUsecaseProxy';

  static register(): DynamicModule {
    return {
      module: AuthUsecasesProxyModule,
      providers: [
        {
          inject: [
            UserRepository,
            BcryptService,
            JwtTokenService,
            ConfigService,
          ],
          provide: AuthUsecasesProxyModule.SIGN_IN_USECASE_PROXY,
          useFactory: (
            userRepository: UserRepository,
            bcryptService: BcryptService,
            jwtTokenService: JwtTokenService,
            config: ConfigService,
          ) =>
            new UsecaseProxy(
              new SignInUsecase(
                userRepository,
                bcryptService,
                jwtTokenService,
                config.get('jwt'),
              ),
            ),
        },
      ],
      exports: [AuthUsecasesProxyModule.SIGN_IN_USECASE_PROXY],
    };
  }
}
