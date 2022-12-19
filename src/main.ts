import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './util/ValidationPipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = await app.get(ConfigService)
  const port = +config.get('API_PORT');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port || 3000, () => {
    console.log('start on port: ' + port);
  });
  console.log(`Application is running on: http://localhost:${port}/graphql`);
}
bootstrap();
