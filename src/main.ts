import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const DATABASE_URL = configService.get('database.url');
  console.info('DATABASE_URL:',DATABASE_URL)
  await app.listen(port||3000);
}
bootstrap();
