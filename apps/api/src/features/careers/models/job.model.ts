import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'jobs' })
export class Job extends Document {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, unique: true, lowercase: true })
  slug: string;

  @Prop({ default: 'Engineering' })
  department: string;

  @Prop({ default: 'Remote' })
  location: string;

  @Prop({
    default: 'full-time',
    enum: ['full-time', 'part-time', 'internship', 'contract', 'training'],
  })
  employmentType: string;

  @Prop({ default: '0-2 years' })
  experience: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ type: [String], default: [] })
  responsibilities: string[];

  @Prop({ type: [String], default: [] })
  requirements: string[];

  @Prop({ default: '' })
  salaryRange: string;

  @Prop({ default: 1 })
  openings: number;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: true })
  published: boolean;
}

export const JobSchema = SchemaFactory.createForClass(Job);
