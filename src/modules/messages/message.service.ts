import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MESSAGE_REPOSITORY } from 'src/core/constants';
import { User } from '../users/entities/user.entity';
import { CreateMessageDTO } from './DTO/create.Message.DTO';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @Inject(MESSAGE_REPOSITORY)
    private readonly messageRepository: typeof Message,
  ) {}
  createMessage(createMessageDTO: CreateMessageDTO) {
    return this.messageRepository.create({
      ...createMessageDTO,
    });
  }

  getMessage(id: number) {
    return this.messageRepository
      .findOne({
        where: { id },
        attributes: [
          'id',
          'title',
          'text',
          'createdAt',
          'updatedAt',
          'user',
          'comments',
        ],
        include: {
          model: User,
          as: 'messages',
        },
      })
      .then((post) => {
        // if (!post) throw new NotFoundException('Message not found'){
        //     return post;
        // }
      });
  }

  //    findOwnerAll(find: any) {
  //     try {
  //       return await this.messageRepository.find({
  //         where: {
  //           user: {
  //             id: find.user,
  //           },
  //         },
  //       });
  //     } catch (error) {
  //       throw new BadRequestException(`${error.driverError}`);
  //     }
  //   }

  findAll() {
    return this.messageRepository
      .findAll({
        include: {
          model: User,
          as: 'messages',
        },
      })
      .then((response) => {
        response.map((message) => {
          //   delete message.user.password;
        });
        return response;
      });
  }

  // deleteMessage(id: string) {
  //   return this.findOne({
  //     where: {
  //       id,
  //     },
  //   }).then((response)=>{

  //     if (!response) throw new NotFoundException('Message not found');
  //     return await this.messageRepository.delete(id);
  //   }
  //   })
}
