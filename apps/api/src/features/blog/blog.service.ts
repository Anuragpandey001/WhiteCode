import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseCrudService } from '../../common/services/base-crud.service';
import { readingTime } from '../../common/utils';
import { Post } from './models/post.model';

@Injectable()
export class BlogService extends BaseCrudService<Post> {
  constructor(@InjectModel(Post.name) model: Model<Post>) {
    super(model, ['title', 'excerpt', 'tags'], 'title');
  }

  async create(dto: Record<string, any>) {
    const payload = {
      ...dto,
      readingTime: readingTime(dto.content || dto.excerpt || ''),
      publishedAt: dto.published ? new Date() : undefined,
    };
    return super.create(payload);
  }

  async update(id: string, dto: Record<string, any>) {
    const payload: Record<string, any> = { ...dto };
    if (dto.content) payload.readingTime = readingTime(dto.content);
    if (dto.published === true) payload.publishedAt = new Date();
    return super.update(id, payload);
  }

  findPublic(category?: string, limit?: number) {
    const filter: Record<string, any> = { published: true };
    if (category && category !== 'all') filter.category = category;
    const query = this.model.find(filter).sort('-publishedAt -createdAt');
    if (limit) query.limit(limit);
    return query.lean().exec();
  }

  /** Public post read: also bumps the view counter. */
  async readBySlug(slug: string) {
    const post = await this.model
      .findOneAndUpdate({ slug, published: true }, { $inc: { views: 1 } }, { new: true })
      .lean()
      .exec();
    if (!post) throw new NotFoundException('Post not found');

    const related = await this.model
      .find({ published: true, slug: { $ne: slug }, category: post.category })
      .select('title slug excerpt coverImage category readingTime publishedAt')
      .limit(3)
      .lean()
      .exec();

    return { post, related };
  }

  categories() {
    return this.model.distinct('category', { published: true });
  }
}
