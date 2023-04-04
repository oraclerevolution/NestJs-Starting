import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Response, Request} from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use((req: Request, res: Response, next: any)=>{
    console.log("Middleware from app.use");
    next()
    
  })
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000,()=>{
    console.log("on ecoute sur le port 3000");
    
  });
}
bootstrap();
