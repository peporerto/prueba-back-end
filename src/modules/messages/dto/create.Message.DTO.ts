import { IsNotEmpty, IsString, Length, MinLength } from 'class-validator';

export class CreateMessageDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  title: string;

  @IsString()
  @Length(0, 300)
  text: string;

  @IsString()
  user: string;
}
