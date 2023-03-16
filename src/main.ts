import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleService } from './core/console/console.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('wirers');
  app.enableCors();
  const service = new ConsoleService();
  const port = process.env.PORT;
  //service.colorMatriz();

  service.title('PRUEBA  SERVICE');
  service.valueMesssage('Contexto de base de datos')(process.env.DB_DATABASE);
  service.valueMesssage('El servicio esta corriendo en el puerto')(port);
  await app.listen(port);
}
bootstrap();
