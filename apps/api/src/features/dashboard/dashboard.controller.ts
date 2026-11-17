import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Public } from '../../common/decorators/public.decorator';

@Controller('dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DashboardController {
  constructor(private readonly dashboard: DashboardService) {}

  @Get('overview')
  @Roles('superadmin', 'admin', 'editor')
  overview() {
    return this.dashboard.overview();
  }

  /** Uptime probe for hosting platforms. */
  @Public()
  @Get('health')
  health() {
    return { status: 'ok', uptime: process.uptime() };
  }
}
