import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

import { ServicesModule } from '../services/services.module';
import { ProjectsModule } from '../projects/projects.module';
import { BlogModule } from '../blog/blog.module';
import { LeadsModule } from '../leads/leads.module';
import { TeamModule } from '../team/team.module';
import { CareersModule } from '../careers/careers.module';
import { NewsletterModule } from '../newsletter/newsletter.module';

@Module({
  imports: [
    ServicesModule,
    ProjectsModule,
    BlogModule,
    LeadsModule,
    TeamModule,
    CareersModule,
    NewsletterModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
