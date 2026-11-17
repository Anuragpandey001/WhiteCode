import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'posts' })
export class Post extends Document {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, unique: true, lowercase: true })
  slug: string;

  @Prop({ required: true })
  excerpt: string;

  @Prop({ default: '' })
  content: string;

  @Prop({ default: '' })
  coverImage: string;

  @Prop({ default: 'Engineering' })
  category: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: Object, default: {} })
  author: { name?: string; role?: string; avatar?: string };

  @Prop({ default: 1 })
  readingTime: number;

  @Prop({ default: 0 })
  views: number;

  @Prop({ default: false })
  featured: boolean;

  @Prop({ default: false })
  published: boolean;

  @Prop()
  publishedAt?: Date;

  @Prop({ type: Object, default: {} })
  seo: { title?: string; description?: string; keywords?: string[] };
}

export const PostSchema = SchemaFactory.createForClass(Post);
PostSchema.index({ title: 'text', excerpt: 'text', tags: 'text' });
