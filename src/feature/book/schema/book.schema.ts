import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { BaseSchema } from 'src/common/base.schema';
import { Tag, TagDocument } from 'src/feature/tag/schema/tag.schema';

@Schema({ timestamps: true })
export class Book extends BaseSchema {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Tag.name }] })
  tags?: (TagDocument | Types.ObjectId)[];
}

export const BookSchema = SchemaFactory.createForClass(Book);
export type BookDocument = HydratedDocument<Book>;
