import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Types } from 'mongoose';
export const professorOption: SchemaOptions = {
  versionKey: false,
  collection: 'professor',
};

@Schema(professorOption)
export class ProfessorDocument {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ unique: true })
  professorId: string;

  @Prop({ minLength: 3, maxLength: 100 })
  faculty: string;

  @Prop({ minLength: 3, maxLength: 100 })
  education: string;

  @Prop({ type: Types.ObjectId, ref: 'UserDocument', required: true })
  user: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now, nullable: true })
  updatedAt: Date;
}

export const ProfessorSchema = SchemaFactory.createForClass(ProfessorDocument);
