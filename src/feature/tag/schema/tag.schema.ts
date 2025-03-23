import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from 'src/common/base.schema';

@Schema({ timestamps: true })
export class Tag extends BaseSchema {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    unique: true,
  })
  hex: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
export type TagDocument = HydratedDocument<Tag>;
