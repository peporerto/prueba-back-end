import { IsEmail, IsString } from 'class-validator';

export class RegisterDTO {
  @IsString()
  userName: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  fullName: string;
}
