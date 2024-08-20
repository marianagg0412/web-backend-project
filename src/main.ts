import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  ConfigModule.forRoot();
  app.enableCors({
    origin: configService.get(process.env.FRONT_URL), 
  });
  await app.listen(3000);
}
bootstrap();
