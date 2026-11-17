import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../auth/models/user.model';
import { ServiceItem } from '../services/models/service.model';
import { Project } from '../projects/models/project.model';
import { Post } from '../blog/models/post.model';
import { Testimonial } from '../testimonials/models/testimonial.model';
import { TeamMember } from '../team/models/team-member.model';
import { Faq } from '../faqs/models/faq.model';
import { Industry } from '../industries/models/industry.model';
import { Job } from '../careers/models/job.model';
import { Setting } from '../settings/models/setting.model';

import {
  FAQS_SEED,
  INDUSTRIES_SEED,
  JOBS_SEED,
  POSTS_SEED,
  PROJECTS_SEED,
  SERVICES_SEED,
  SETTINGS_SEED,
  TEAM_SEED,
  TESTIMONIALS_SEED,
} from './seed.data';

@Injectable()
export class SeedService {
  private readonly logger = new Logger('Seed');

  constructor(
    private readonly config: ConfigService,
    @InjectModel(User.name) private readonly users: Model<User>,
    @InjectModel(ServiceItem.name) private readonly services: Model<ServiceItem>,
    @InjectModel(Project.name) private readonly projects: Model<Project>,
    @InjectModel(Post.name) private readonly posts: Model<Post>,
    @InjectModel(Testimonial.name)
    private readonly testimonials: Model<Testimonial>,
    @InjectModel(TeamMember.name) private readonly team: Model<TeamMember>,
    @InjectModel(Faq.name) private readonly faqs: Model<Faq>,
    @InjectModel(Industry.name) private readonly industries: Model<Industry>,
    @InjectModel(Job.name) private readonly jobs: Model<Job>,
    @InjectModel(Setting.name) private readonly settings: Model<Setting>,
  ) {}

  /** Idempotent: upserts by slug/key, so it is safe to re-run. */
  async run(force = false) {
    const summary: Record<string, number> = {};

    summary.admin = (await this.seedAdmin()) ? 1 : 0;
    summary.services = await this.upsertMany(this.services, SERVICES_SEED, 'slug', force);
    summary.projects = await this.upsertMany(this.projects, PROJECTS_SEED, 'slug', force);
    summary.posts = await this.upsertMany(
      this.posts,
      POSTS_SEED.map((p) => ({ ...p, publishedAt: new Date() })),
      'slug',
      force,
    );
    summary.industries = await this.upsertMany(this.industries, INDUSTRIES_SEED, 'slug', force);
    summary.jobs = await this.upsertMany(this.jobs, JOBS_SEED, 'slug', force);
    summary.faqs = await this.upsertMany(this.faqs, FAQS_SEED, 'question', force);
    summary.testimonials = await this.upsertMany(
      this.testimonials,
      TESTIMONIALS_SEED,
      'name',
      force,
    );
    summary.team = await this.upsertMany(this.team, TEAM_SEED, 'name', force);

    await this.settings.updateOne(
      { key: 'singleton' },
      { $set: { key: 'singleton', ...SETTINGS_SEED } },
      { upsert: true },
    );
    summary.settings = 1;

    this.logger.log(`Seed complete: ${JSON.stringify(summary)}`);
    return summary;
  }

  private async seedAdmin(): Promise<boolean> {
    const email = (this.config.get<string>('seed.email') || '').toLowerCase();
    const exists = await this.users.findOne({ email }).exec();
    if (exists) return false;

    await this.users.create({
      name: this.config.get<string>('seed.name'),
      email,
      password: this.config.get<string>('seed.password'),
      role: 'superadmin',
    });
    this.logger.log(`Created superadmin: ${email}`);
    return true;
  }

  private async upsertMany(
    model: Model<any>,
    rows: Record<string, any>[],
    uniqueBy: string,
    force: boolean,
  ): Promise<number> {
    let written = 0;
    for (const row of rows) {
      const filter = { [uniqueBy]: row[uniqueBy] };
      const existing = await model.findOne(filter).lean().exec();
      if (existing && !force) continue;
      await model.updateOne(filter, { $set: row }, { upsert: true });
      written += 1;
    }
    return written;
  }

  async reset() {
    await Promise.all([
      this.services.deleteMany({}),
      this.projects.deleteMany({}),
      this.posts.deleteMany({}),
      this.testimonials.deleteMany({}),
      this.team.deleteMany({}),
      this.faqs.deleteMany({}),
      this.industries.deleteMany({}),
      this.jobs.deleteMany({}),
    ]);
    return this.run(true);
  }
}
