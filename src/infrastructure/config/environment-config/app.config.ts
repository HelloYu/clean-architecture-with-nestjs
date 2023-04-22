import { Injectable } from '@nestjs/common';
import { ConfigService, registerAs } from '@nestjs/config';
import { IsEnum, IsString, validate } from 'class-validator';
import { environmentValidationUtil } from './environment-validation-util';
import { IAppConfig } from 'src/domain/config/app-config.interface';
import { Environment } from './environment';

export class AppVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;
}

export const AppConfig = registerAs('app', (): IAppConfig => {
  // Executes our custom function
  environmentValidationUtil(process.env, AppVariables);

  // If all is valid, this will return successfully
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: parseInt(process.env.PORT) || 3000,
  };
});
