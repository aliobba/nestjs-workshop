/* import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(
    { 
      origin: ['http://localhost:3000', process.env.REACT_FRONT_URI],
    }
  );
  
  const config = new DocumentBuilder()
    .setTitle('Workshop example')
    .setDescription('The Workshop API description')
    .setVersion('1.0')
    .addTag('Workshop')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}
bootstrap(); */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express';
import * as serverless from 'serverless-http';
import * as helmet from 'helmet';
import { AppModule } from './module';

const bootstrap = async (module: any) => {
  const app = express();
  const nestApp = await NestFactory.create(module, new ExpressAdapter(app));

  nestApp.setGlobalPrefix('/.netlify/functions/main');
  nestApp.enableCors({
    origin: ['http://localhost:3000', process.env.REACT_FRONT_URI],
    credentials: true,
  });
  nestApp.use(helmet());
  nestApp.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  nestApp.use(express.json({ limit: '50mb' }));
  nestApp.use(express.urlencoded({ limit: '50mb', extended: true }));

  const config = new DocumentBuilder()
    .setTitle('Workshop example')
    .setDescription('The Workshop API description')
    .setVersion('1.0')
    .addTag('Workshop')
    .build();
  const document = SwaggerModule.createDocument(nestApp, config);
  SwaggerModule.setup('api', nestApp, document);

  await nestApp.init();
  return app;
};

let cachedHadler: any;
const proxyApi = async (module: any, event: any, context: any) => {
  if (!cachedHadler) {
    const app = await bootstrap(module);
    cachedHadler = serverless(app);
  }

  return cachedHadler(event, context);
};

export const handler = async (event: any, context: any) =>
  proxyApi(AppModule, event, context);
