import {
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  Sequelize,
} from 'sequelize';

export class Message extends Model<
  InferAttributes<Message>,
  InferCreationAttributes<Message>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare text: string;
  declare comments: string | null;
  declare createdAt: string;
  declare updatedAt: string;

  static initModel(sequelize: Sequelize): typeof Message {
    Message.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        text: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        comments: {
          type: DataTypes.JSON,
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

    return Message;
  }
}
