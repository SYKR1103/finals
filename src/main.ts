import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BaseApiDocument } from './config/swagger.document';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new BaseApiDocument().initializeOptions();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-dogcs', app, document);

  await app.listen(3000);
}
bootstrap();
