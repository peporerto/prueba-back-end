import type { Sequelize, Model } from 'sequelize';
import { User } from './users/entities/user.entity';
import { Message } from './messages/entities/message.entity';

export { User, Message };

export function initModels(sequelize: Sequelize) {
  User.initModel(sequelize);
  Message.initModel(sequelize);

  User.hasMany(Message, {
    as: 'messages',
    foreignKey: 'userId',
  });

  return {
    User,
    Message,
  };
}
