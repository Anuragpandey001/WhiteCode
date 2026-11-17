import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseCrudService } from '../../common/services/base-crud.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Job } from './models/job.model';
import { Application } from './models/application.model';
import {
  CreateApplicationDto,
  UpdateApplicationDto,
} from './dto/careers.dto';

@Injectable()
export class CareersService extends BaseCrudService<Job> {
  constructor(
    @InjectModel(Job.name) model: Model<Job>,
    @InjectModel(Application.name)
    private readonly applicationModel: Model<Application>,
  ) {
    super(model, ['title', 'department', 'location'], 'title');
  }

  findPublic() {
    return this.model
      .find({ published: true })
      .sort('order -createdAt')
      .lean()
      .exec();
  }

  // ---------- applications ----------
  async apply(dto: CreateApplicationDto) {
    const job = await this.model.findById(dto.job).lean().exec();
    if (!job) throw new NotFoundException('This opening is no longer available');

    const application = await this.applicationModel.create({
      ...dto,
      jobTitle: job.title,
    });
    return {
      id: String(application._id),
      received: true,
      message: 'Application received. Our team will review it shortly.',
    };
  }

  async listApplications(query: PaginationDto & { job?: string; status?: string }) {
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 20);
    const filter: Record<string, any> = {};
    if (query.job) filter.job = query.job;
    if (query.status && query.status !== 'all') filter.status = query.status;
    if (query.q) {
      filter.$or = [
        { name: { $regex: query.q, $options: 'i' } },
        { email: { $regex: query.q, $options: 'i' } },
        { jobTitle: { $regex: query.q, $options: 'i' } },
      ];
    }

    const [items, total] = await Promise.all([
      this.applicationModel
        .find(filter)
        .sort('-createdAt')
        .skip((page - 1) * limit)
        .limit(limit)
        .lean()
        .exec(),
      this.applicationModel.countDocuments(filter),
    ]);

    return {
      items,
      meta: { total, page, limit, pages: Math.max(1, Math.ceil(total / limit)) },
    };
  }

  async updateApplication(id: string, dto: UpdateApplicationDto) {
    const app = await this.applicationModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!app) throw new NotFoundException('Application not found');
    return app;
  }

  async removeApplication(id: string) {
    const app = await this.applicationModel.findByIdAndDelete(id).exec();
    if (!app) throw new NotFoundException('Application not found');
    return { id, deleted: true };
  }

  countApplications() {
    return this.applicationModel.countDocuments();
  }
}
