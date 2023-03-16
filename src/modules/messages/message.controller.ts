import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/core/auth/guards/jwt-guard';
import { MESSAGE_REPOSITORY } from 'src/core/constants';
import { CreateMessageDTO } from './DTO/create.Message.DTO';
import { FindMessageDTO } from './DTO/findMessage.DTO';
import { Message } from './entities/message.entity';
import { MessageService } from './message.service';

@Controller('messages')
@UseGuards(AuthGuard)
export class MessageController {
  constructor(
    @Inject(MESSAGE_REPOSITORY)
    private readonly messagesService: MessageService,
  ) {}
  @Post('/')
  createMessage(@Body() createPostDTO: CreateMessageDTO) {
    console.log(createPostDTO);
    return this.messagesService.createMessage(createPostDTO);
  }

  @Get('me/:id')
  getMessage(@Param('id') id: string) {
    return this.messagesService.getMessage(+id);
  }

  //   @Get('me')
  //   findOwnerMessages(@Body() findMessage: any) {
  //     return this.messagesService.findOwnerAll(findMessage);
  //   }

  //   @Get('find')
  //   findFilterMessages(@Body() findMessage: FindMessageDTO) {
  //     return this.messagesService.findFilterMessage(findMessage);
  //   }

  //   @Delete(':id')
  //   deleteMessage(@Param('id') id: string) {
  //     return this.messagesService.deleteMessage(id);
  //   }

  //   @Patch('comment/:id')
  //   createComment(@Param('id') id: string, @Body() comment: commentDTO) {
  //     return this.messagesService.createComment(+id, comment);
  //   }
}
