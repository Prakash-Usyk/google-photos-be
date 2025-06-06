import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePhotoAlbumDto {
  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  album: string;
}
