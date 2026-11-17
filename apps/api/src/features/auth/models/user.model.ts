import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type UserRole = 'superadmin' | 'admin' | 'editor';

@Schema({ timestamps: true, collection: 'users' })
export class User extends Document {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ default: 'admin', enum: ['superadmin', 'admin', 'editor'] })
  role: UserRole;

  @Prop({ default: true })
  active: boolean;

  @Prop()
  avatar?: string;

  @Prop()
  lastLoginAt?: Date;

  comparePassword: (plain: string) => Promise<boolean>;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password as string, 10);
  next();
});

UserSchema.methods.comparePassword = function (plain: string) {
  return bcrypt.compare(plain, this.password);
};
