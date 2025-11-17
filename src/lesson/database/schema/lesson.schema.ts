import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export const lessonOption: SchemaOptions = {
  versionKey: false,
  collection: 'lesson',
};

@Schema(lessonOption)
export class LessonDocument {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ minLength: 3, maxLength: 100 })
  title: string;

  @Prop({ type: Number, default: 1 })
  unit: number;

  @Prop({ type: Types.ObjectId, ref: 'UserDocument', required: true })
  createdBy: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now, nullable: true })
  updatedAt: Date;
}

export const LessonSchema = SchemaFactory.createForClass(LessonDocument);
