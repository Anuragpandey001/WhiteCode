import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'testimonials' })
export class Testimonial extends Document {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ default: '' })
  role: string;

  @Prop({ default: '' })
  company: string;

  @Prop({ default: '' })
  avatar: string;

  @Prop({ required: true })
  quote: string;

  @Prop({ default: 5, min: 1, max: 5 })
  rating: number;

  @Prop({ default: '' })
  projectSlug: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: true })
  published: boolean;
}

export const TestimonialSchema = SchemaFactory.createForClass(Testimonial);
