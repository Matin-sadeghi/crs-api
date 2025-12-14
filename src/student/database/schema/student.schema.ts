import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export const studentOption: SchemaOptions = {
  versionKey: false,
  collection: 'student',
};

@Schema(studentOption)
export class StudentDocument {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ unique: true })
  studentId: string;

  @Prop({ type: Types.ObjectId, ref: 'MajorDocument', required: true })
  major: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'UserDocument', required: true })
  user: Types.ObjectId;
  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now, nullable: true })
  updatedAt: Date;
}

export const StudentSchema = SchemaFactory.createForClass(StudentDocument);
