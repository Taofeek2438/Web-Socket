import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 4000);
  const corsOptions = {
    origin: 'http://localhost:3000', // Vue app origin
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  };

  // Enable CORS with options
  app.enableCors(corsOptions);
}
bootstrap();
