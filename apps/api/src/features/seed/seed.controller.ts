import { Controller, Post, UseGuards } from '@nestjs/common';
import { SeedService } from './seed.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('seed')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SeedController {
  constructor(private readonly seed: SeedService) {}

  /** Adds any missing demo content without touching what you have edited. */
  @Post()
  @Roles('superadmin')
  run() {
    return this.seed.run(false);
  }

  /** Wipes demo collections and re-seeds them from scratch. */
  @Post('reset')
  @Roles('superadmin')
  reset() {
    return this.seed.reset();
  }
}
