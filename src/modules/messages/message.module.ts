import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { Module } from '@nestjs/common';

import { AuthModule } from 'src/core/auth/auth.module';
import { ConsoleService } from 'src/core/console/console.service';
import { MessageProviders } from './message.providers';
import { DatabaseModule } from 'src/core/database/database.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [MessageController],
  providers: [MessageService, ConsoleService, ...MessageProviders, JwtService],
})
export class MessageModule {}
