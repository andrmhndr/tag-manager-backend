import { Prop, Schema } from '@nestjs/mongoose';
import { Expose, Transform } from 'class-transformer';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class BaseSchema {
  _id?: Types.ObjectId | string;
  updatedAt: Date;
  createdAt: Date;

  @Prop()
  deletedAt?: Date;
}
