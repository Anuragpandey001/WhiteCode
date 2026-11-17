import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

import configuration from './config/configuration';
import { DatabaseModule } from './config/database.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { RequestIdMiddleware } from './common/middleware/request-id.middleware';

import { AuthModule } from './features/auth/auth.module';
import { ServicesModule } from './features/services/services.module';
import { ProjectsModule } from './features/projects/projects.module';
import { BlogModule } from './features/blog/blog.module';
import { LeadsModule } from './features/leads/leads.module';
import { TestimonialsModule } from './features/testimonials/testimonials.module';
import { TeamModule } from './features/team/team.module';
import { CareersModule } from './features/careers/careers.module';
import { FaqsModule } from './features/faqs/faqs.module';
import { IndustriesModule } from './features/industries/industries.module';
import { NewsletterModule } from './features/newsletter/newsletter.module';
import { SettingsModule } from './features/settings/settings.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { UploadsModule } from './features/uploads/uploads.module';
import { SeedModule } from './features/seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 120 }]),
    DatabaseModule,

    // ---- feature modules ----
    AuthModule,
    ServicesModule,
    ProjectsModule,
    BlogModule,
    LeadsModule,
    TestimonialsModule,
    TeamModule,
    CareersModule,
    FaqsModule,
    IndustriesModule,
    NewsletterModule,
    SettingsModule,
    DashboardModule,
    UploadsModule,
    SeedModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware, LoggerMiddleware).forRoutes('*');
  }
}
