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
import { IndustriesService } from './industries.service';
import { CreateIndustryDto, UpdateIndustryDto } from './dto/industry.dto';
import { ReorderDto } from '../services/dto/service.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('industries')
@UseGuards(JwtAuthGuard, RolesGuard)
export class IndustriesController {
  constructor(private readonly industries: IndustriesService) {}

  @Public()
  @Get()
  list() {
    return this.industries.findPublic();
  }

  @Get('manage')
  @Roles('superadmin', 'admin', 'editor')
  manageList(@Query() query: PaginationDto) {
    return this.industries.findAll(query);
  }

  @Post()
  @Roles('superadmin', 'admin')
  create(@Body() dto: CreateIndustryDto) {
    return this.industries.create(dto);
  }

  @Post('reorder')
  @Roles('superadmin', 'admin')
  reorder(@Body() dto: ReorderDto) {
    return this.industries.reorder(dto.ids);
  }

  @Patch(':id')
  @Roles('superadmin', 'admin')
  update(@Param('id') id: string, @Body() dto: UpdateIndustryDto) {
    return this.industries.update(id, dto);
  }

  @Delete(':id')
  @Roles('superadmin', 'admin')
  remove(@Param('id') id: string) {
    return this.industries.remove(id);
  }
}
