import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000,()=>{
    console.log("on ecoute sur le port 3000");
    
  });
}
bootstrap();
