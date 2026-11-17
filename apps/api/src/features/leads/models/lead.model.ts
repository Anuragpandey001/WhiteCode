import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'proposal'
  | 'won'
  | 'lost';

/** An enquiry from the website: contact form, pricing page or service page. */
@Schema({ timestamps: true, collection: 'leads' })
export class Lead extends Document {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, lowercase: true, trim: true })
  email: string;

  @Prop({ default: '' })
  phone: string;

  @Prop({ default: '' })
  company: string;

  /** which service they are enquiring about */
  @Prop({ default: '' })
  service: string;

  @Prop({ default: '' })
  budget: string;

  @Prop({ default: '' })
  timeline: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: 'website' })
  source: string;

  @Prop({
    default: 'new',
    enum: ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'],
  })
  status: LeadStatus;

  @Prop({ default: 0 })
  dealValue: number;

  @Prop({ type: [{ text: String, author: String, at: Date }], default: [] })
  notes: { text: string; author: string; at: Date }[];

  @Prop({ default: '' })
  assignedTo: string;

  @Prop({ default: '' })
  ipAddress: string;
}

export const LeadSchema = SchemaFactory.createForClass(Lead);
LeadSchema.index({ createdAt: -1 });
