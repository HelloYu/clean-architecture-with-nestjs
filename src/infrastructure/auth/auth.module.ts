import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthUsecasesProxyModule } from '../usecases-proxy/auth-usecases-proxy.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [AuthUsecasesProxyModule.register(), PassportModule],
  providers: [LocalStrategy, JwtStrategy],
  exports: [],
})
export class AuthModule {}
