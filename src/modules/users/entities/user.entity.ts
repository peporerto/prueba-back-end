import {
  Association,
  CreationOptional,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize';
import type { Message } from '../../messages/entities/message.entity';

type UserAssociations = 'messages';

export class User extends Model<
  InferAttributes<User, { omit: UserAssociations }>,
  InferCreationAttributes<User, { omit: UserAssociations }>
> {
  declare id: CreationOptional<string>;
  declare userName: string;
  declare fullName: string;
  declare password: string;
  declare email: string;
  declare createdAt: string;
  declare updatedAt: string;

  // User hasMany Message (as Messages)
  declare messages?: NonAttribute<Message[]>;
  declare getMessages: HasManyGetAssociationsMixin<Message>;
  declare setMessages: HasManySetAssociationsMixin<Message, number>;
  declare addMessage: HasManyAddAssociationMixin<Message, number>;
  declare addMessages: HasManyAddAssociationsMixin<Message, number>;
  declare createMessage: HasManyCreateAssociationMixin<Message>;
  declare removeMessage: HasManyRemoveAssociationMixin<Message, number>;
  declare removeMessages: HasManyRemoveAssociationsMixin<Message, number>;
  declare hasMessage: HasManyHasAssociationMixin<Message, number>;
  declare hasMessages: HasManyHasAssociationsMixin<Message, number>;
  declare countMessages: HasManyCountAssociationsMixin;

  declare static associations: {
    messages: Association<User, Message>;
  };

  static initModel(sequelize: Sequelize): typeof User {
    User.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4,
        },
        userName: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        fullName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
        },
        updatedAt: {
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
      },
    );

    return User;
  }
}
