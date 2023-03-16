import { MESSAGE_REPOSITORY } from 'src/core/constants';
import { Message } from './entities/message.entity';

export const MessageProviders = [
  {
    provide: MESSAGE_REPOSITORY,
    useValue: Message,
  },
];
