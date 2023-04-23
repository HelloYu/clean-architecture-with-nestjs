import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoDBEnvironmentConfig } from './mongodb-environment.config';
import { AppConfig } from './app.config';
import { JwtEnvironmentConfig } from './jwt-environment.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './env/local.env',
      ignoreEnvFile: !(
        process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test'
      ),
      isGlobal: true,
      load: [AppConfig, MongoDBEnvironmentConfig, JwtEnvironmentConfig],
    }),
  ],
})
export class EnvironmentConfigModule {}
