import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseCrudService } from '../../common/services/base-crud.service';
import { TeamMember } from './models/team-member.model';

@Injectable()
export class TeamService extends BaseCrudService<TeamMember> {
  constructor(@InjectModel(TeamMember.name) model: Model<TeamMember>) {
    super(model, ['name', 'role', 'skills']);
  }

  findPublic() {
    return this.model.find({ published: true }).sort('order name').lean().exec();
  }
}
