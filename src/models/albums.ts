import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as paginate from 'mongoose-paginate-v2';

export type AlbumsDocument = HydratedDocument<Albums>;

@Schema({ timestamps: true })
export class Albums {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: [String] })
  meta_data: string[];
}

export const AlbumsSchema = SchemaFactory.createForClass(Albums);

AlbumsSchema.plugin(paginate);
