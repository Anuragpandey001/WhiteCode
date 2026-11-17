import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseCrudService } from '../../common/services/base-crud.service';
import { Faq } from './models/faq.model';

@Injectable()
export class FaqsService extends BaseCrudService<Faq> {
  constructor(@InjectModel(Faq.name) model: Model<Faq>) {
    super(model, ['question', 'answer']);
  }

  findPublic(category?: string) {
    const filter: Record<string, any> = { published: true };
    if (category && category !== 'all') filter.category = category;
    return this.model.find(filter).sort('order').lean().exec();
  }
}
