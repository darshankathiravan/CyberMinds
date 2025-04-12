import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // Enable CORS for your frontend domain
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  // For local development
  if (process.env.NODE_ENV !== 'production') {
    await app.listen(process.env.PORT || 3001);
  }

  return app;
}

// For local development
if (process.env.NODE_ENV !== 'production') {
  bootstrap();
}

// For Vercel
export default bootstrap;
