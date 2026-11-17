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
import { Throttle } from '@nestjs/throttler';
import { CareersService } from './careers.service';
import {
  CreateApplicationDto,
  CreateJobDto,
  UpdateApplicationDto,
  UpdateJobDto,
} from './dto/careers.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('careers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CareersController {
  constructor(private readonly careers: CareersService) {}

  // ---------- public ----------
  @Public()
  @Get()
  list() {
    return this.careers.findPublic();
  }

  @Public()
  @Get('slug/:slug')
  bySlug(@Param('slug') slug: string) {
    return this.careers.findBySlug(slug);
  }

  @Public()
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post('apply')
  apply(@Body() dto: CreateApplicationDto) {
    return this.careers.apply(dto);
  }

  // ---------- admin: applications ----------
  @Get('applications')
  @Roles('superadmin', 'admin')
  applications(@Query() query: PaginationDto & { job?: string; status?: string }) {
    return this.careers.listApplications(query);
  }

  @Patch('applications/:id')
  @Roles('superadmin', 'admin')
  updateApplication(@Param('id') id: string, @Body() dto: UpdateApplicationDto) {
    return this.careers.updateApplication(id, dto);
  }

  @Delete('applications/:id')
  @Roles('superadmin', 'admin')
  removeApplication(@Param('id') id: string) {
    return this.careers.removeApplication(id);
  }

  // ---------- admin: jobs ----------
  @Get('manage')
  @Roles('superadmin', 'admin', 'editor')
  manageList(@Query() query: PaginationDto) {
    return this.careers.findAll(query);
  }

  @Post()
  @Roles('superadmin', 'admin')
  create(@Body() dto: CreateJobDto) {
    return this.careers.create(dto);
  }

  @Patch(':id')
  @Roles('superadmin', 'admin')
  update(@Param('id') id: string, @Body() dto: UpdateJobDto) {
    return this.careers.update(id, dto);
  }

  @Patch(':id/publish')
  @Roles('superadmin', 'admin')
  togglePublish(@Param('id') id: string) {
    return this.careers.togglePublished(id);
  }

  @Delete(':id')
  @Roles('superadmin', 'admin')
  remove(@Param('id') id: string) {
    return this.careers.remove(id);
  }
}
