import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // Set the global prefix for API routes
  app.enableCors(); // Enable CORS
  await app.listen(3000);
}
bootstrap();
