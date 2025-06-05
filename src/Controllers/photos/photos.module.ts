import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotossController } from './photos.controller';
import { Photos, PhotosSchema } from 'src/models/photos';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Photos.name, schema: PhotosSchema }]),
  ],
  providers: [PhotosService],
  controllers: [PhotossController],
})
export class PhotosModule {}
