import { Module } from '@nestjs/common';
import { UserUsecasesProxyModule } from '../usecases-proxy/user-usecases-proxy.module';
import { UserController } from './user/user.controller';
import { MappersModule } from '../mappers/mappers.module';
import { AuthController } from './auth/auth.controller';
import { AuthUsecasesProxyModule } from '../usecases-proxy/auth-usecases-proxy.module';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    UserUsecasesProxyModule.register(),
    AuthUsecasesProxyModule.register(),
    MappersModule,
    LoggerModule,
  ],
  providers: [],
  controllers: [UserController, AuthController],
})
export class ControllersModule {}
