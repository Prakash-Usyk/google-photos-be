import { IsNotEmpty } from 'class-validator';

export class CreatePhotoAlbumDto {
  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  album: string;
}
