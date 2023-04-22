import { Module } from '@nestjs/common';
import { UserUsecasesProxyModule } from '../usecases-proxy/user-usecases-proxy.module';
import { UserController } from './user/user.controller';
import { MappersModule } from '../mappers/mappers.module';

@Module({
  imports: [UserUsecasesProxyModule.register(), MappersModule],
  providers: [],
  controllers: [UserController],
})
export class ControllersModule {}
