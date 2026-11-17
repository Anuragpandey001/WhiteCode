import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseCrudService } from '../../common/services/base-crud.service';
import { Testimonial } from './models/testimonial.model';

@Injectable()
export class TestimonialsService extends BaseCrudService<Testimonial> {
  constructor(@InjectModel(Testimonial.name) model: Model<Testimonial>) {
    super(model, ['name', 'company', 'quote']);
  }

  findPublic(limit?: number) {
    const query = this.model.find({ published: true }).sort('order -createdAt');
    if (limit) query.limit(limit);
    return query.lean().exec();
  }
}
