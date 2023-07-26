import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors:true});
  app.enableCors()
  app.setGlobalPrefix("api")
  app.use(express.json({ limit: '50mb' }));
  // await app.listen(process.env.PORT||"0.0.0.0");
  await app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is Connected")
});
}
bootstrap();
