import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserDocument } from 'src/user/database/schema/user.schema';

@Schema()
export class StudentDocument extends UserDocument {
  @Prop()
  grade?: string;

  @Prop()
  major?: string;
}

export const StudentSchema = SchemaFactory.createForClass(StudentDocument);
