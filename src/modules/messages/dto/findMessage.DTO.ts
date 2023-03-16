import { IsString, IsOptional } from 'class-validator';

export class FindMessageDTO {
  @IsString()
  @IsOptional()
  search?: string;

  @IsOptional()
  date?: Date;

  @IsOptional()
  user?: string;
}
