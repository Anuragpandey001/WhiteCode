import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'projects' })
export class Project extends Document {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, unique: true, lowercase: true })
  slug: string;

  @Prop({ default: '' })
  client: string;

  @Prop({ required: true })
  summary: string;

  @Prop({ default: '' })
  description: string;

  @Prop({
    default: 'web',
    enum: ['web', 'mobile', 'ai', 'ecommerce', 'marketing', 'video', 'branding'],
  })
  type: string;

  @Prop({ default: '' })
  industry: string;

  @Prop({ default: '' })
  coverImage: string;

  @Prop({ type: [String], default: [] })
  gallery: string[];

  @Prop({ type: [String], default: [] })
  technologies: string[];

  /** headline outcomes, e.g. "3.1x more installs" */
  @Prop({ type: [{ label: String, value: String }], default: [] })
  results: { label: string; value: string }[];

  @Prop({ default: '' })
  liveUrl: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: false })
  featured: boolean;

  @Prop({ default: true })
  published: boolean;

  @Prop()
  completedAt?: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
