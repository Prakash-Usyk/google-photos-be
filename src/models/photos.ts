import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as paginate from 'mongoose-paginate-v2';

export type PhotosDocument = HydratedDocument<Photos>;

@Schema()
export class Photos {
  @Prop({ required: true })
  image: string;
}

export const PhotosSchema = SchemaFactory.createForClass(Photos);

PhotosSchema.plugin(paginate);
