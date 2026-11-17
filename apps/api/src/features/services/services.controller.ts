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
import { ServicesService } from './services.service';
import {
  CreateServiceDto,
  ReorderDto,
  UpdateServiceDto,
} from './dto/service.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('services')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ServicesController {
  constructor(private readonly services: ServicesService) {}

  // ---------- public routes ----------
  @Public()
  @Get()
  list(@Query('category') category?: string) {
    return this.services.findPublic(category);
  }

  @Public()
  @Get('featured')
  featured(@Query('limit') limit?: number) {
    return this.services.findFeatured(limit ? Number(limit) : 6);
  }

  @Public()
  @Get('slug/:slug')
  bySlug(@Param('slug') slug: string) {
    return this.services.findBySlug(slug);
  }

  // ---------- admin routes ----------
  @Get('manage')
  @Roles('superadmin', 'admin', 'editor')
  manageList(@Query() query: PaginationDto) {
    return this.services.findAll(query);
  }

  @Get('manage/:id')
  @Roles('superadmin', 'admin', 'editor')
  manageOne(@Param('id') id: string) {
    return this.services.findOne(id);
  }

  @Post()
  @Roles('superadmin', 'admin', 'editor')
  create(@Body() dto: CreateServiceDto) {
    return this.services.create(dto);
  }

  @Post('reorder')
  @Roles('superadmin', 'admin')
  reorder(@Body() dto: ReorderDto) {
    return this.services.reorder(dto.ids);
  }

  @Patch(':id')
  @Roles('superadmin', 'admin', 'editor')
  update(@Param('id') id: string, @Body() dto: UpdateServiceDto) {
    return this.services.update(id, dto);
  }

  @Patch(':id/publish')
  @Roles('superadmin', 'admin')
  togglePublish(@Param('id') id: string) {
    return this.services.togglePublished(id);
  }

  @Delete(':id')
  @Roles('superadmin', 'admin')
  remove(@Param('id') id: string) {
    return this.services.remove(id);
  }
}
