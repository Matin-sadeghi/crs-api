import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { LessonType } from 'src/utils/enum';

export const lessonOption: SchemaOptions = {
  versionKey: false,
  collection: 'lesson',
};

@Schema(lessonOption)
export class LessonDocument {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ type: String, required: true, unique: true })
  lessonId: string;

  @Prop({ minLength: 3, maxLength: 100 })
  title: string;

  @Prop({ type: Number, default: 1, min: 1, max: 6 })
  unit: number;

  @Prop({ enum: LessonType })
  type: LessonType;

  @Prop({ type: String, required: true })
  field: string;

  @Prop({ type: Types.ObjectId, ref: 'UserDocument', required: true })
  createdBy: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now, nullable: true })
  updatedAt: Date;
}

export const LessonSchema = SchemaFactory.createForClass(LessonDocument);
