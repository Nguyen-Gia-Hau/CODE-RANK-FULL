import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3001',
      'https://apidog.com',
      'http://192.168.1.190:3001'
    ],
  })

  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public/'
  });

  await app.listen(3000);
}
bootstrap();
