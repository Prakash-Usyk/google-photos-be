import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePhotoDto {
  @IsNotEmpty()
  image: string;
}
