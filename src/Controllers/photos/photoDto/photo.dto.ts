import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePhotoDto {
  @IsNotEmpty()
  image: string;

  @IsOptional()
  is_deleted: string;
}
