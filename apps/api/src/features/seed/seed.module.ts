import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

import { User, UserSchema } from '../auth/models/user.model';
import { ServiceItem, ServiceSchema } from '../services/models/service.model';
import { Project, ProjectSchema } from '../projects/models/project.model';
import { Post, PostSchema } from '../blog/models/post.model';
import {
  Testimonial,
  TestimonialSchema,
} from '../testimonials/models/testimonial.model';
import { TeamMember, TeamMemberSchema } from '../team/models/team-member.model';
import { Faq, FaqSchema } from '../faqs/models/faq.model';
import { Industry, IndustrySchema } from '../industries/models/industry.model';
import { Job, JobSchema } from '../careers/models/job.model';
import { Setting, SettingSchema } from '../settings/models/setting.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: ServiceItem.name, schema: ServiceSchema },
      { name: Project.name, schema: ProjectSchema },
      { name: Post.name, schema: PostSchema },
      { name: Testimonial.name, schema: TestimonialSchema },
      { name: TeamMember.name, schema: TeamMemberSchema },
      { name: Faq.name, schema: FaqSchema },
      { name: Industry.name, schema: IndustrySchema },
      { name: Job.name, schema: JobSchema },
      { name: Setting.name, schema: SettingSchema },
    ]),
  ],
  controllers: [SeedController],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
