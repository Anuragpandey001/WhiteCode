import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'applications' })
export class Application extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Job', required: true })
  job: Types.ObjectId;

  @Prop({ default: '' })
  jobTitle: string;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, lowercase: true })
  email: string;

  @Prop({ default: '' })
  phone: string;

  @Prop({ default: '' })
  resumeUrl: string;

  @Prop({ default: '' })
  portfolio: string;

  @Prop({ default: '' })
  coverLetter: string;

  @Prop({
    default: 'applied',
    enum: ['applied', 'screening', 'interview', 'offer', 'hired', 'rejected'],
  })
  status: string;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
