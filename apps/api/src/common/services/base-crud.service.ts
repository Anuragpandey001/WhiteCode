import { NotFoundException } from '@nestjs/common';
import { Document, FilterQuery, Model } from 'mongoose';
import { Paginated, PaginationDto } from '../dto/pagination.dto';
import { slugify } from '../utils';

/**
 * Generic CRUD used by every feature service, so each feature only
 * declares its model + searchable fields and adds its own extras.
 */
export abstract class BaseCrudService<T extends Document> {
  protected constructor(
    protected readonly model: Model<T>,
    protected readonly searchable: string[] = ['title'],
    protected readonly slugFrom?: string,
  ) {}

  protected baseFilter(_query: PaginationDto): FilterQuery<T> {
    return {};
  }

  async findAll(query: PaginationDto): Promise<Paginated<T>> {
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 20);
    const filter: FilterQuery<any> = { ...this.baseFilter(query) };

    if (query.q && this.searchable.length) {
      filter.$or = this.searchable.map((field) => ({
        [field]: { $regex: query.q, $options: 'i' },
      }));
    }
    if (query.published === 'true') filter.published = true;
    if (query.published === 'false') filter.published = false;

    const [items, total] = await Promise.all([
      this.model
        .find(filter)
        .sort(query.sort || '-createdAt')
        .skip((page - 1) * limit)
        .limit(limit)
        .lean({ virtuals: true })
        .exec() as any,
      this.model.countDocuments(filter),
    ]);

    return {
      items,
      meta: { total, page, limit, pages: Math.max(1, Math.ceil(total / limit)) },
    };
  }

  count(filter: FilterQuery<T> = {}): Promise<number> {
    return this.model.countDocuments(filter).exec();
  }

  async findOne(id: string): Promise<T> {
    const doc = await this.model.findById(id).exec();
    if (!doc) throw new NotFoundException('Record not found');
    return doc;
  }

  async findBySlug(slug: string): Promise<T> {
    const doc = await this.model.findOne({ slug } as FilterQuery<T>).exec();
    if (!doc) throw new NotFoundException('Record not found');
    return doc;
  }

  async create(dto: Record<string, any>): Promise<T> {
    return this.model.create(this.withSlug(dto));
  }

  async update(id: string, dto: Record<string, any>): Promise<T> {
    const doc = await this.model
      .findByIdAndUpdate(id, this.withSlug(dto, false), { new: true, runValidators: true })
      .exec();
    if (!doc) throw new NotFoundException('Record not found');
    return doc;
  }

  async remove(id: string): Promise<{ id: string; deleted: true }> {
    const doc = await this.model.findByIdAndDelete(id).exec();
    if (!doc) throw new NotFoundException('Record not found');
    return { id, deleted: true };
  }

  async togglePublished(id: string): Promise<T> {
    const doc = await this.findOne(id);
    (doc as any).published = !(doc as any).published;
    await doc.save();
    return doc;
  }

  /** Reorder helper for drag-and-drop lists in the admin panel. */
  async reorder(ids: string[]): Promise<{ updated: number }> {
    await Promise.all(
      ids.map((id, index) =>
        this.model.findByIdAndUpdate(id, { order: index } as any).exec(),
      ),
    );
    return { updated: ids.length };
  }

  private withSlug(dto: Record<string, any>, required = true) {
    if (!this.slugFrom) return dto;
    if (dto.slug) return { ...dto, slug: slugify(dto.slug) };
    if (dto[this.slugFrom]) return { ...dto, slug: slugify(dto[this.slugFrom]) };
    if (required && dto[this.slugFrom] === undefined) return dto;
    return dto;
  }
}
