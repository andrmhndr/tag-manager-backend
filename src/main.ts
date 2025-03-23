import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ErrorInterceptor } from './core/interceptor/error.interceptor';
import { LoggerInterceptor } from './core/interceptor/logger.interceptor';
import { ResponseInterceptor } from './core/interceptor/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.useGlobalInterceptors(
    new ResponseInterceptor(),
    new ErrorInterceptor(),
    new LoggerInterceptor(),
    // new ClassSerializerInterceptor(app.get(Reflector)),
  );

  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT');

  await app.listen(port);
  console.log(`Server running on port ${port}`);
}
bootstrap();
