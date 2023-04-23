import { registerAs } from '@nestjs/config';
import { IsEnum, IsNumber, IsString, validate } from 'class-validator';
import { environmentValidationUtil } from './environment-validation-util';
import { IJwtConfig } from 'src/domain/config/jwt-config.interface';
import ms, { StringValue } from 'ms';

export class JwtEnvironmentVariables {
  @IsString()
  JWT_SECRET: string;
  @IsString()
  JWT_EXPIRATION_TIME: string;
  @IsString()
  JWT_REFRESH_TOKEN_SECRET: string;
  @IsString()
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: string;
}

export const JwtEnvironmentConfig = registerAs('jwt', (): IJwtConfig => {
  // Executes our custom function
  environmentValidationUtil(process.env, JwtEnvironmentVariables);
  const expirationTime = ms(
    process.env.JWT_EXPIRATION_TIME as StringValue,
  ) as number;
  const refreshTokenExpirationTime = ms(
    process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME as StringValue,
  ) as number;

  // If all is valid, this will return successfully
  return {
    SECRET: process.env.JWT_SECRET,
    EXPIRATION_TIME: expirationTime / 1000,
    REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRATION_TIME: refreshTokenExpirationTime / 1000,
  };
});
