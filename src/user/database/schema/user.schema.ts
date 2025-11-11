import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';

export const userOption: SchemaOptions = {
  versionKey: false,
  collection: 'user',
};

@Schema(userOption)
export class UserDocument {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
