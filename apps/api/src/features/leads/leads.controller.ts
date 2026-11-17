import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Ip,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { LeadsService } from './leads.service';
import { AddLeadNoteDto, CreateLeadDto, UpdateLeadDto } from './dto/lead.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('leads')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LeadsController {
  constructor(private readonly leads: LeadsService) {}

  // ---------- public: website contact form ----------
  @Public()
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post()
  submit(@Body() dto: CreateLeadDto, @Ip() ip: string) {
    return this.leads.submit(dto, ip);
  }

  // ---------- admin ----------
  @Get()
  @Roles('superadmin', 'admin', 'editor')
  list(@Query() query: PaginationDto & { status?: string }) {
    return this.leads.listForAdmin(query);
  }

  @Get('stats')
  @Roles('superadmin', 'admin')
  stats() {
    return this.leads.stats();
  }

  @Get('export')
  @Roles('superadmin', 'admin')
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename="leads.csv"')
  exportCsv() {
    return this.leads.exportCsv();
  }

  @Get(':id')
  @Roles('superadmin', 'admin', 'editor')
  one(@Param('id') id: string) {
    return this.leads.findOne(id);
  }

  @Patch(':id')
  @Roles('superadmin', 'admin')
  update(@Param('id') id: string, @Body() dto: UpdateLeadDto) {
    return this.leads.setStatus(id, dto);
  }

  @Post(':id/notes')
  @Roles('superadmin', 'admin', 'editor')
  addNote(
    @Param('id') id: string,
    @Body() dto: AddLeadNoteDto,
    @CurrentUser('name') author: string,
  ) {
    return this.leads.addNote(id, dto, author || 'Admin');
  }

  @Delete(':id')
  @Roles('superadmin', 'admin')
  remove(@Param('id') id: string) {
    return this.leads.remove(id);
  }
}
