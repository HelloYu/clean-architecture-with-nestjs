import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';

export const getMongooseModuleOptions = (
  config: ConfigService,
): MongooseModuleFactoryOptions =>
  ({
    uri: config.get<string>('database.URI'),
    authSource: 'admin',
    autoIndex: true,
  } as MongooseModuleFactoryOptions);

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [ConfigService],
      useFactory: getMongooseModuleOptions,
    }),
  ],
})
export class MongoDBConfigModule {}
