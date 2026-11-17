import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'subscribers' })
export class Subscriber extends Document {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ default: '' })
  name: string;

  @Prop({ default: 'footer' })
  source: string;

  @Prop({ default: true })
  active: boolean;
}

export const SubscriberSchema = SchemaFactory.createForClass(Subscriber);
