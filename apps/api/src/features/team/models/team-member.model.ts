import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'team_members' })
export class TeamMember extends Document {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true })
  role: string;

  @Prop({ default: '' })
  bio: string;

  @Prop({ default: '' })
  avatar: string;

  @Prop({ type: [String], default: [] })
  skills: string[];

  @Prop({ type: Object, default: {} })
  socials: {
    linkedin?: string;
    github?: string;
    x?: string;
    instagram?: string;
    dribbble?: string;
  };

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: true })
  published: boolean;
}

export const TeamMemberSchema = SchemaFactory.createForClass(TeamMember);
