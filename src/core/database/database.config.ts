import { ConfigService } from '@nestjs/config';
import { IDatabaseConfigAttributes } from './interfaces/dbConfig.interface';

export function databaseConfig(
  configService: ConfigService,
): IDatabaseConfigAttributes {
  return {
    userName: configService.get<string>('DB_userName') || 'PLEASE CONFIGURE',
    password: configService.get<string>('DB_PASSWORD') || '',
    database: configService.get<string>('DB_DATABASE') || '',
    host: configService.get<string>('DB_HOST') || 'localhost',
    port: configService.get<string>('DB_PORT') || '3306',
    dialect: 'mysql',
  };
}
