import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'industries' })
export class Industry extends Document {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true })
  slug: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: 'Building2' })
  icon: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: true })
  published: boolean;
}

export const IndustrySchema = SchemaFactory.createForClass(Industry);
