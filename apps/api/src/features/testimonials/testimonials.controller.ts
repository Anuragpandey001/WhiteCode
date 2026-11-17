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
import { TestimonialsService } from './testimonials.service';
import {
  CreateTestimonialDto,
  UpdateTestimonialDto,
} from './dto/testimonial.dto';
import { ReorderDto } from '../services/dto/service.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('testimonials')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TestimonialsController {
  constructor(private readonly testimonials: TestimonialsService) {}

  @Public()
  @Get()
  list(@Query('limit') limit?: number) {
    return this.testimonials.findPublic(limit ? Number(limit) : undefined);
  }

  @Get('manage')
  @Roles('superadmin', 'admin', 'editor')
  manageList(@Query() query: PaginationDto) {
    return this.testimonials.findAll(query);
  }

  @Post()
  @Roles('superadmin', 'admin', 'editor')
  create(@Body() dto: CreateTestimonialDto) {
    return this.testimonials.create(dto);
  }

  @Post('reorder')
  @Roles('superadmin', 'admin')
  reorder(@Body() dto: ReorderDto) {
    return this.testimonials.reorder(dto.ids);
  }

  @Patch(':id')
  @Roles('superadmin', 'admin', 'editor')
  update(@Param('id') id: string, @Body() dto: UpdateTestimonialDto) {
    return this.testimonials.update(id, dto);
  }

  @Patch(':id/publish')
  @Roles('superadmin', 'admin')
  togglePublish(@Param('id') id: string) {
    return this.testimonials.togglePublished(id);
  }

  @Delete(':id')
  @Roles('superadmin', 'admin')
  remove(@Param('id') id: string) {
    return this.testimonials.remove(id);
  }
}
