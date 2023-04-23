import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../../config/environment-config/environment-config.module';
import { ConfigService } from '@nestjs/config';
import { JwtModule as Jwt, JwtModuleOptions } from '@nestjs/jwt';
import { JwtTokenService } from './jwt.service';

export const getJwtModuleOptions = (config: ConfigService): JwtModuleOptions =>
  ({
    secret: config.get('jwt.SECRET'),
    signOptions: {
      expiresIn: config.get('jwt.EXPIRATION_TIME'),
    },
  } as JwtModuleOptions);

@Module({
  imports: [
    Jwt.registerAsync({
      imports: [EnvironmentConfigModule],
      inject: [ConfigService],
      useFactory: getJwtModuleOptions,
    }),
  ],
  providers: [JwtTokenService],
  exports: [JwtTokenService],
})
export class JwtModule {}
