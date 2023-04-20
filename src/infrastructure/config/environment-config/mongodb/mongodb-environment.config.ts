import { Injectable } from '@nestjs/common';
import { ConfigService, registerAs } from '@nestjs/config';
import { IsEnum, IsString, validate } from 'class-validator';
import { IMongoDBConfig } from 'src/domain/config/mongodb-database-config.interface';
import { environmentValidationUtil } from '../environment-validation-util';

export class MongoDBEnvironmentVariables {
  @IsString()
  DATABASE_URL: string;
}

export const MongoDBEnvironmentConfig =  registerAs('database', (): IMongoDBConfig => {

  // Executes our custom function
  environmentValidationUtil(process.env,MongoDBEnvironmentVariables);

  // If all is valid, this will return successfully
  return {
    url: process.env.DATABASE_URL,
  };
});