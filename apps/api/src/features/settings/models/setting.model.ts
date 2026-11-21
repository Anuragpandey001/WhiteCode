import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/** Single document that drives the public site's brand, contact and stats. */
@Schema({ timestamps: true, collection: 'settings' })
export class Setting extends Document {
  @Prop({ default: 'singleton', unique: true })
  key: string;

  @Prop({ default: 'WhiteCodel' })
  brandName: string;

  @Prop({ default: 'Your in-house tech and growth team, on demand.' })
  tagline: string;

  @Prop({ default: '' })
  logo: string;

  @Prop({ type: Object, default: {} })
  contact: {
    email?: string;
    phone?: string;
    whatsapp?: string;
    address?: string;
    calendarUrl?: string;
  };

  @Prop({ type: Object, default: {} })
  socials: {
    linkedin?: string;
    instagram?: string;
    x?: string;
    github?: string;
    youtube?: string;
    dribbble?: string;
  };

  @Prop({
    type: [{ label: String, value: String }],
    default: [],
  })
  stats: { label: string; value: string }[];

  @Prop({ type: Object, default: {} })
  hero: {
    eyebrow?: string;
    headline?: string;
    subheadline?: string;
    primaryCta?: string;
    secondaryCta?: string;
  };

  @Prop({ type: Object, default: {} })
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
  };

  @Prop({ type: Object, default: {} })
  analytics: { gaId?: string; gtmId?: string; metaPixel?: string };

  @Prop({ type: [String], default: [] })
  clientLogos: string[];
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
