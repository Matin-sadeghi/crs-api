import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export const classroomOption: SchemaOptions = {
  versionKey: false,
  collection: 'classroom',
};

@Schema(classroomOption)
export class ClassroomDocument {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ type: String, required: true })
  room_number: string;

  @Prop({ type: Number, required: true, min: 1 })
  capacity: number;

  @Prop({ type: Types.ObjectId, ref: 'FacultyDocument', required: true })
  faculty: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now, nullable: true })
  updatedAt: Date;
}

export const ClassroomSchema = SchemaFactory.createForClass(ClassroomDocument);

// Compound unique index: room_number must be unique per faculty
ClassroomSchema.index({ room_number: 1, faculty: 1 }, { unique: true });
