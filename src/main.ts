import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BaseApiDocument } from './config/swagger.document';
import { SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpeExceptionFilter } from './filters/httpe-exception.filter';
import { Reflector } from '@nestjs/core';
import { TransformInterceptor } from './interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));

  app.useGlobalFilters(new HttpeExceptionFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new TransformInterceptor());

  const config = new BaseApiDocument().initializeOptions();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-dogcs', app, document);

  await app.listen(3000);
}
bootstrap();
