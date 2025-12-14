import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export const majorOption: SchemaOptions = {
  versionKey: false,
  collection: 'major',
};

@Schema(majorOption)
export class MajorDocument {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ minLength: 3, maxLength: 100 })
  title: string;

  @Prop({ type: String, required: true, unique: true })
  code: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now, nullable: true })
  updatedAt: Date;
}

export const MajorSchema = SchemaFactory.createForClass(MajorDocument);
