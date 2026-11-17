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
import { FaqsService } from './faqs.service';
import { CreateFaqDto, UpdateFaqDto } from './dto/faq.dto';
import { ReorderDto } from '../services/dto/service.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('faqs')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FaqsController {
  constructor(private readonly faqs: FaqsService) {}

  @Public()
  @Get()
  list(@Query('category') category?: string) {
    return this.faqs.findPublic(category);
  }

  @Get('manage')
  @Roles('superadmin', 'admin', 'editor')
  manageList(@Query() query: PaginationDto) {
    return this.faqs.findAll(query);
  }

  @Post()
  @Roles('superadmin', 'admin', 'editor')
  create(@Body() dto: CreateFaqDto) {
    return this.faqs.create(dto);
  }

  @Post('reorder')
  @Roles('superadmin', 'admin')
  reorder(@Body() dto: ReorderDto) {
    return this.faqs.reorder(dto.ids);
  }

  @Patch(':id')
  @Roles('superadmin', 'admin', 'editor')
  update(@Param('id') id: string, @Body() dto: UpdateFaqDto) {
    return this.faqs.update(id, dto);
  }

  @Patch(':id/publish')
  @Roles('superadmin', 'admin')
  togglePublish(@Param('id') id: string) {
    return this.faqs.togglePublished(id);
  }

  @Delete(':id')
  @Roles('superadmin', 'admin')
  remove(@Param('id') id: string) {
    return this.faqs.remove(id);
  }
}
