import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post as HttpPost,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('blog')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BlogController {
  constructor(private readonly blog: BlogService) {}

  // ---------- public ----------
  @Public()
  @Get()
  list(@Query('category') category?: string, @Query('limit') limit?: number) {
    return this.blog.findPublic(category, limit ? Number(limit) : undefined);
  }

  @Public()
  @Get('categories')
  categories() {
    return this.blog.categories();
  }

  @Public()
  @Get('slug/:slug')
  bySlug(@Param('slug') slug: string) {
    return this.blog.readBySlug(slug);
  }

  // ---------- admin ----------
  @Get('manage')
  @Roles('superadmin', 'admin', 'editor')
  manageList(@Query() query: PaginationDto) {
    return this.blog.findAll(query);
  }

  @Get('manage/:id')
  @Roles('superadmin', 'admin', 'editor')
  manageOne(@Param('id') id: string) {
    return this.blog.findOne(id);
  }

  @HttpPost()
  @Roles('superadmin', 'admin', 'editor')
  create(@Body() dto: CreatePostDto) {
    return this.blog.create(dto);
  }

  @Patch(':id')
  @Roles('superadmin', 'admin', 'editor')
  update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    return this.blog.update(id, dto);
  }

  @Patch(':id/publish')
  @Roles('superadmin', 'admin')
  togglePublish(@Param('id') id: string) {
    return this.blog.togglePublished(id);
  }

  @Delete(':id')
  @Roles('superadmin', 'admin')
  remove(@Param('id') id: string) {
    return this.blog.remove(id);
  }
}
