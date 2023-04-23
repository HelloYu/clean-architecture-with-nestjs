import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { AuthModule } from './infrastructure/auth/auth.module';

@Module({
  imports: [ControllersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
