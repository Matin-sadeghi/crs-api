import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export const facultyOption: SchemaOptions = {
  versionKey: false,
  collection: 'faculty',
};

@Schema(facultyOption)
export class FacultyDocument {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ minLength: 3, maxLength: 100, unique: true })
  name: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now, nullable: true })
  updatedAt: Date;
}

export const FacultySchema = SchemaFactory.createForClass(FacultyDocument);
