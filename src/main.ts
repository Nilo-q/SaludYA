import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1'); // esta parte se utiliza para nombrar la URL de nuestra API 

  //
  app.useGlobalPipes(
    /*Esta configuración hace una de validación que permita solo las propiedades que están definidas en la
      clase DTO (Objectos de Transferencia de Datos) utilizada para validar los datos de entrada. 
     Las propiedades adicionales que no estén definidas en el DTO serán eliminadas */
    new ValidationPipe({
      whitelist: true,  
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
