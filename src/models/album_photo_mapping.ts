import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import * as paginate from 'mongoose-paginate-v2';
import { Albums } from './albums';
import { Photos } from './photos';

export type AlbumPhotoMappingDocument = HydratedDocument<AlbumPhotoMapping>;

@Schema()
export class AlbumPhotoMapping {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Albums' })
  album: Albums;

  @Prop({
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Photos' },
  })
  photos: Photos;
}

export const AlbumPhotoMappingSchema =
  SchemaFactory.createForClass(AlbumPhotoMapping);

AlbumPhotoMappingSchema.plugin(paginate);
