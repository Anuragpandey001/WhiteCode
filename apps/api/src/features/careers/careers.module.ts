import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CareersController } from './careers.controller';
import { CareersService } from './careers.service';
import { Job, JobSchema } from './models/job.model';
import { Application, ApplicationSchema } from './models/application.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Job.name, schema: JobSchema },
      { name: Application.name, schema: ApplicationSchema },
    ]),
  ],
  controllers: [CareersController],
  providers: [CareersService],
  exports: [CareersService, MongooseModule],
})
export class CareersModule {}
