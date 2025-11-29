import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export const adminOption: SchemaOptions = {
  versionKey: false,
  collection: 'admin',
};

@Schema(adminOption)
export class AdminDocument {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ unique: true })
  adminId: string;

  @Prop({ type: Types.ObjectId, ref: 'UserDocument', required: true })
  user: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now, nullable: true })
  updatedAt: Date;
}

export const AdminSchema = SchemaFactory.createForClass(AdminDocument);
