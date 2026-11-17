import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseCrudService } from '../../common/services/base-crud.service';
import { Industry } from './models/industry.model';

@Injectable()
export class IndustriesService extends BaseCrudService<Industry> {
  constructor(@InjectModel(Industry.name) model: Model<Industry>) {
    super(model, ['name', 'description'], 'name');
  }

  findPublic() {
    return this.model.find({ published: true }).sort('order name').lean().exec();
  }
}
