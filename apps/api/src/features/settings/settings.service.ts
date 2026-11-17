import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Setting } from './models/setting.model';
import { UpdateSettingDto } from './dto/setting.dto';

const KEY = 'singleton';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Setting.name) private readonly model: Model<Setting>,
  ) {}

  /** Always returns a settings document, creating defaults on first call. */
  async get() {
    const existing = await this.model.findOne({ key: KEY }).lean().exec();
    if (existing) return existing;
    const created = await this.model.create({ key: KEY });
    return created.toObject();
  }

  async update(dto: UpdateSettingDto) {
    return this.model
      .findOneAndUpdate({ key: KEY }, dto, { new: true, upsert: true })
      .lean()
      .exec();
  }
}
