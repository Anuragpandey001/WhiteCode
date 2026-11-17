import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/** A service we sell: app dev, web dev, digital marketing, video editing, etc. */
@Schema({ timestamps: true, collection: 'services' })
export class ServiceItem extends Document {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, unique: true, lowercase: true })
  slug: string;

  @Prop({ required: true })
  excerpt: string;

  @Prop({ default: '' })
  description: string;

  /** lucide-react icon name rendered by the website */
  @Prop({ default: 'Sparkles' })
  icon: string;

  @Prop({
    default: 'development',
    enum: ['development', 'design', 'marketing', 'media', 'cloud', 'support'],
  })
  category: string;

  @Prop({ type: [String], default: [] })
  features: string[];

  @Prop({ type: [String], default: [] })
  technologies: string[];

  @Prop({ type: [String], default: [] })
  deliverables: string[];

  @Prop({ default: '' })
  startingPrice: string;

  @Prop({ default: '' })
  timeline: string;

  @Prop({ default: '' })
  coverImage: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: false })
  featured: boolean;

  @Prop({ default: true })
  published: boolean;

  @Prop({ type: Object, default: {} })
  seo: { title?: string; description?: string; keywords?: string[] };
}

export const ServiceSchema = SchemaFactory.createForClass(ServiceItem);
ServiceSchema.index({ title: 'text', excerpt: 'text' });
