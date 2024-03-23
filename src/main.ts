import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cors from 'cors';

import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors());

  const config = new DocumentBuilder()
    .setTitle('To-do Api Documentation')
    .setDescription('Todo Api Documentation')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',

        name: 'JWT',
        description: 'Enter with token',
        in: 'header'
      },
      'KEY_AUTH'
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 80, '0.0.0.0');
}

bootstrap();
