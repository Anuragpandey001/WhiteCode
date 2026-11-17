import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseCrudService } from '../../common/services/base-crud.service';
import { ServiceItem } from './models/service.model';

@Injectable()
export class ServicesService extends BaseCrudService<ServiceItem> {
  constructor(
    @InjectModel(ServiceItem.name) model: Model<ServiceItem>,
  ) {
    super(model, ['title', 'excerpt', 'technologies'], 'title');
  }

  /** What the public website renders on /services. */
  findPublic(category?: string) {
    const filter: Record<string, any> = { published: true };
    if (category && category !== 'all') filter.category = category;
    return this.model.find(filter).sort('order title').lean().exec();
  }

  findFeatured(limit = 6) {
    return this.model
      .find({ published: true, featured: true })
      .sort('order')
      .limit(limit)
      .lean()
      .exec();
  }

  countByCategory() {
    return this.model.aggregate([
      { $match: { published: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
  }
}
