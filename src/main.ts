import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      transform: true,
      skipNullProperties: false,
      skipUndefinedProperties: false,
      validationError: { target: false, value: false },
      stopAtFirstError: false,
      forbidUnknownValues: true,
      exceptionFactory(validationErrors: ValidationError[] = []) {
        return new BadRequestException(validationErrors);
      },
    }),
  );
  await app.listen(4043);
}
bootstrap();
