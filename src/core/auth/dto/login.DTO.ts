import { IsString } from 'class-validator';

export class LoginDTO {
  @IsString()
  userName: string;

  @IsString()
  password: string;
}
