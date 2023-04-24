import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { LoggingInterceptor } from './infrastructure/common/interceptors/logging.interceptor';
import { LoggerService } from './infrastructure/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  const configService = app.get(ConfigService);
  const PORT = configService.get('app.PORT');
  const NODE_ENV = configService.get('app.NODE_ENV');

  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));

  // swagger config
  if (NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Clean Architecture Nestjs')
      .setDescription('Example by SEO禅')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      deepScanRoutes: true,
    });
    SwaggerModule.setup('api', app, document);
  }

  app.enableCors();
  await app.listen(PORT);
}
bootstrap();
