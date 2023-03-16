import { IsOptional, IsString } from 'class-validator';

export class commentDTO {
  @IsString()
  comment: string;

  @IsOptional()
  user: string;
}
