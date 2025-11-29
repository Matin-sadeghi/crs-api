import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { UserGender, UserRole, UserStatus } from 'src/utils/enum';

export const userOption: SchemaOptions = {
  versionKey: false,
  collection: 'user',
};

@Schema(userOption)
export class UserDocument {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;
  @Prop()
  username: string;

  @Prop({ minLength: 3, maxLength: 100 })
  firstName: string;

  @Prop({ minLength: 3, maxLength: 100 })
  lastName: string;

  @Prop({ enum: UserRole })
  role: UserRole;

  @Prop({ enum: UserGender })
  gender: UserGender;

  @Prop({ enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;

  @Prop({ maxLength: 20, minLength: 10, unique: true })
  nationalId: string;

  @Prop({ maxLength: 12 })
  phone: string;

  @Prop()
  address: string;

  @Prop()
  password: string;

  @Prop({ nullable: true })
  accessToken?: string;
  @Prop({ nullable: true })
  refreshToken?: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  // Relations
  @Prop({ type: Types.ObjectId, ref: 'StudentDocument', required: false })
  student: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'ProfessorDocument', required: false })
  professor: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'AdminDocument', required: false })
  admin: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
