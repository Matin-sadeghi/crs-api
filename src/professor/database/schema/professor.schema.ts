import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserDocument } from 'src/user/database/schema/user.schema';

@Schema()
export class ProfessorDocument extends UserDocument {
  @Prop()
  department?: string;

  @Prop()
  officeNumber?: string;
}

export const ProfessorSchema = SchemaFactory.createForClass(ProfessorDocument);
