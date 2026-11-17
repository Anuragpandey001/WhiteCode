import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
import { ReorderDto } from '../services/dto/service.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('projects')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProjectsController {
  constructor(private readonly projects: ProjectsService) {}

  // ---------- public ----------
  @Public()
  @Get()
  list(@Query('type') type?: string, @Query('limit') limit?: number) {
    return this.projects.findPublic(type, limit ? Number(limit) : undefined);
  }

  @Public()
  @Get('featured')
  featured(@Query('limit') limit?: number) {
    return this.projects.findFeatured(limit ? Number(limit) : 6);
  }

  @Public()
  @Get('types')
  types() {
    return this.projects.types();
  }

  @Public()
  @Get('slug/:slug')
  bySlug(@Param('slug') slug: string) {
    return this.projects.findBySlug(slug);
  }

  // ---------- admin ----------
  @Get('manage')
  @Roles('superadmin', 'admin', 'editor')
  manageList(@Query() query: PaginationDto) {
    return this.projects.findAll(query);
  }

  @Get('manage/:id')
  @Roles('superadmin', 'admin', 'editor')
  manageOne(@Param('id') id: string) {
    return this.projects.findOne(id);
  }

  @Post()
  @Roles('superadmin', 'admin', 'editor')
  create(@Body() dto: CreateProjectDto) {
    return this.projects.create(dto);
  }

  @Post('reorder')
  @Roles('superadmin', 'admin')
  reorder(@Body() dto: ReorderDto) {
    return this.projects.reorder(dto.ids);
  }

  @Patch(':id')
  @Roles('superadmin', 'admin', 'editor')
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projects.update(id, dto);
  }

  @Patch(':id/publish')
  @Roles('superadmin', 'admin')
  togglePublish(@Param('id') id: string) {
    return this.projects.togglePublished(id);
  }

  @Delete(':id')
  @Roles('superadmin', 'admin')
  remove(@Param('id') id: string) {
    return this.projects.remove(id);
  }
}
