import { registerAs } from '@nestjs/config';
import { IsEnum, IsNumber, IsString, validate } from 'class-validator';
import { environmentValidationUtil } from './environment-validation-util';
import { IMongoDBConfig } from 'src/domain/config/mongodb-database-config.interface';

export class MongoDBEnvironmentVariables {
  @IsString()
  DATABASE_HOST: string;
  @IsNumber()
  DATABASE_PORT: Number;
  @IsString()
  DATABASE_USERNAME: string;
  @IsString()
  DATABASE_PASSWORD: string;
  @IsString()
  DATABASE_NAME: string;
}

export const MongoDBEnvironmentConfig = registerAs(
  'database',
  (): IMongoDBConfig => {
    // Executes our custom function
    environmentValidationUtil(process.env, MongoDBEnvironmentVariables);

    const URI = `mongodb://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;

    // If all is valid, this will return successfully
    return {
      URI: URI,
    };
  },
);
