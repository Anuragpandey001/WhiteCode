import { Injectable } from '@nestjs/common';
import { ServicesService } from '../services/services.service';
import { ProjectsService } from '../projects/projects.service';
import { BlogService } from '../blog/blog.service';
import { LeadsService } from '../leads/leads.service';
import { TeamService } from '../team/team.service';
import { CareersService } from '../careers/careers.service';
import { NewsletterService } from '../newsletter/newsletter.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly services: ServicesService,
    private readonly projects: ProjectsService,
    private readonly blog: BlogService,
    private readonly leads: LeadsService,
    private readonly team: TeamService,
    private readonly careers: CareersService,
    private readonly newsletter: NewsletterService,
  ) {}

  /** Everything the admin home screen needs, in one round trip. */
  async overview() {
    const [
      servicesCount,
      projectsCount,
      postsCount,
      publishedPosts,
      teamCount,
      jobsCount,
      applicationsCount,
      subscribersCount,
      leadStats,
      recentLeads,
      servicesByCategory,
    ] = await Promise.all([
      this.services.count(),
      this.projects.count(),
      this.blog.count(),
      this.blog.count({ published: true } as any),
      this.team.count(),
      this.careers.count({ published: true } as any),
      this.careers.countApplications(),
      this.newsletter.count(),
      this.leads.stats(),
      this.leads.recent(6),
      this.services.countByCategory(),
    ]);

    return {
      counts: {
        services: servicesCount,
        projects: projectsCount,
        posts: postsCount,
        publishedPosts,
        team: teamCount,
        openJobs: jobsCount,
        applications: applicationsCount,
        subscribers: subscribersCount,
        leads: leadStats.total,
        newLeads:
          leadStats.byStatus.find((s) => s.status === 'new')?.count ?? 0,
      },
      leads: leadStats,
      recentLeads,
      servicesByCategory: servicesByCategory.map((s: any) => ({
        category: s._id,
        count: s.count,
      })),
    };
  }
}
