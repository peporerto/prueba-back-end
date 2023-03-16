import { UserController } from './modules/users/user.controller';
import { DatabaseModule } from './core/database/database.module';
import { ConsoleModule } from './core/console/console.module';
import { AuthModule } from './core/auth/auth.module';
import { MessageModule } from './modules/messages/message.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentSchema } from './core/auth/validators/environment.scheme';

@Module({
  imports: [
    ConsoleModule,
    AuthModule,
    MessageModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: EnvironmentSchema,
    }),
  ],
  /*controllers: [UserController, AppController],
  providers: [AppService],*/
})
export class AppModule {}
