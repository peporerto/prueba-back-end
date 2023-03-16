import { USERS_REPOSITORY } from 'src/core/constants';
import { User } from 'src/modules';

export const UserProviders = [
  {
    provide: USERS_REPOSITORY,
    useValue: User,
  },
];
