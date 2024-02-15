import { DocumentBuilder } from '@nestjs/swagger';

export class BaseApiDocument {
  public builder = new DocumentBuilder();

  public initializeOptions() {
    return this.builder
      .setTitle("Sungyeon's blog")
      .setDescription('API Study')
      .setVersion('1.0')
      .build();
  }
}
