import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as paginate from 'mongoose-paginate-v2';

export type PhotosDocument = HydratedDocument<Photos>;

@Schema({ timestamps: true })
export class Photos {
  @Prop({ required: true })
  image: string;

  @Prop({ default: false })
  is_deleted: boolean;
}

export const PhotosSchema = SchemaFactory.createForClass(Photos);

PhotosSchema.plugin(paginate);
