import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseCrudService } from '../../common/services/base-crud.service';
import { Project } from './models/project.model';

@Injectable()
export class ProjectsService extends BaseCrudService<Project> {
  constructor(@InjectModel(Project.name) model: Model<Project>) {
    super(model, ['title', 'client', 'summary', 'technologies'], 'title');
  }

  findPublic(type?: string, limit?: number) {
    const filter: Record<string, any> = { published: true };
    if (type && type !== 'all') filter.type = type;
    const query = this.model.find(filter).sort('order -completedAt');
    if (limit) query.limit(limit);
    return query.lean().exec();
  }

  findFeatured(limit = 6) {
    return this.model
      .find({ published: true, featured: true })
      .sort('order')
      .limit(limit)
      .lean()
      .exec();
  }

  types() {
    return this.model.distinct('type', { published: true });
  }
}
