import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePhotoDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  meta_data: string;

  @IsOptional()
  images: string[];

  @IsOptional()
  is_deleted: string;
}
