import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { CatModule } from './cat/cat.module';

@Module({
  imports: [CatModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
