import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscriber } from './models/subscriber.model';
import { SubscribeDto } from './dto/subscriber.dto';

@Injectable()
export class NewsletterService {
  constructor(
    @InjectModel(Subscriber.name)
    private readonly model: Model<Subscriber>,
  ) {}

  async subscribe(dto: SubscribeDto) {
    await this.model.updateOne(
      { email: dto.email.toLowerCase() },
      { $set: { ...dto, active: true } },
      { upsert: true },
    );
    return { subscribed: true, message: 'You are on the list. Welcome aboard!' };
  }

  async unsubscribe(email: string) {
    await this.model.updateOne({ email: email.toLowerCase() }, { active: false });
    return { unsubscribed: true };
  }

  list() {
    return this.model.find().sort('-createdAt').lean().exec();
  }

  count() {
    return this.model.countDocuments({ active: true });
  }

  async remove(id: string) {
    await this.model.findByIdAndDelete(id).exec();
    return { id, deleted: true };
  }
}
