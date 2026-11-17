import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseCrudService } from '../../common/services/base-crud.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Lead } from './models/lead.model';
import { AddLeadNoteDto, CreateLeadDto, UpdateLeadDto } from './dto/lead.dto';

@Injectable()
export class LeadsService extends BaseCrudService<Lead> {
  constructor(@InjectModel(Lead.name) model: Model<Lead>) {
    super(model, ['name', 'email', 'company', 'message', 'service']);
  }

  async submit(dto: CreateLeadDto, ipAddress?: string) {
    const lead = await this.model.create({ ...dto, ipAddress: ipAddress || '' });
    return {
      id: String(lead._id),
      received: true,
      message: 'Thanks! We will get back to you within one business day.',
    };
  }

  /** Admin list with an extra status filter on top of the base pagination. */
  async listForAdmin(query: PaginationDto & { status?: string }) {
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 20);
    const filter: Record<string, any> = {};

    if (query.status && query.status !== 'all') filter.status = query.status;
    if (query.q) {
      filter.$or = this.searchable.map((field) => ({
        [field]: { $regex: query.q, $options: 'i' },
      }));
    }

    const [items, total] = await Promise.all([
      this.model
        .find(filter)
        .sort(query.sort || '-createdAt')
        .skip((page - 1) * limit)
        .limit(limit)
        .lean()
        .exec(),
      this.model.countDocuments(filter),
    ]);

    return {
      items,
      meta: { total, page, limit, pages: Math.max(1, Math.ceil(total / limit)) },
    };
  }

  async setStatus(id: string, dto: UpdateLeadDto) {
    return this.update(id, dto);
  }

  async addNote(id: string, dto: AddLeadNoteDto, author: string) {
    const lead = await this.findOne(id);
    lead.notes.push({ text: dto.text, author, at: new Date() });
    await lead.save();
    return lead;
  }

  async stats() {
    const [byStatus, totals, monthly] = await Promise.all([
      this.model.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
      this.model.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            pipelineValue: { $sum: '$dealValue' },
            won: { $sum: { $cond: [{ $eq: ['$status', 'won'] }, 1, 0] } },
          },
        },
      ]),
      this.model.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
        { $limit: 12 },
      ]),
    ]);

    const summary = totals[0] || { total: 0, pipelineValue: 0, won: 0 };
    return {
      byStatus: byStatus.map((s) => ({ status: s._id, count: s.count })),
      total: summary.total,
      won: summary.won,
      pipelineValue: summary.pipelineValue,
      conversionRate: summary.total
        ? Math.round((summary.won / summary.total) * 100)
        : 0,
      monthly: monthly.map((m) => ({ month: m._id, count: m.count })),
    };
  }

  recent(limit = 6) {
    return this.model
      .find()
      .sort('-createdAt')
      .limit(limit)
      .select('name email company service status createdAt')
      .lean()
      .exec();
  }

  /** CSV export for the admin panel. */
  async exportCsv() {
    const leads = await this.model.find().sort('-createdAt').lean().exec();
    const header = [
      'Name',
      'Email',
      'Phone',
      'Company',
      'Service',
      'Budget',
      'Status',
      'Created',
    ].join(',');
    const rows = leads.map((l) =>
      [
        l.name,
        l.email,
        l.phone,
        l.company,
        l.service,
        l.budget,
        l.status,
        new Date((l as any).createdAt).toISOString(),
      ]
        .map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`)
        .join(','),
    );
    return [header, ...rows].join('\n');
  }
}
