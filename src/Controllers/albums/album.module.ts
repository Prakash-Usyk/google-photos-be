import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { Albums, AlbumsSchema } from 'src/models/albums';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AlbumPhotoMapping,
  AlbumPhotoMappingSchema,
} from 'src/models/album_photo_mapping';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Albums.name, schema: AlbumsSchema },
      { name: AlbumPhotoMapping.name, schema: AlbumPhotoMappingSchema },
    ]),
  ],
  providers: [AlbumService],
  controllers: [AlbumController],
})
export class AlbumModule {}
