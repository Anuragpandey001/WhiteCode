import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { NewsletterService } from './newsletter.service';
import { SubscribeDto } from './dto/subscriber.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('newsletter')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NewsletterController {
  constructor(private readonly newsletter: NewsletterService) {}

  @Public()
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post('subscribe')
  subscribe(@Body() dto: SubscribeDto) {
    return this.newsletter.subscribe(dto);
  }

  @Public()
  @Post('unsubscribe')
  unsubscribe(@Body('email') email: string) {
    return this.newsletter.unsubscribe(email);
  }

  @Get()
  @Roles('superadmin', 'admin')
  list() {
    return this.newsletter.list();
  }

  @Delete(':id')
  @Roles('superadmin', 'admin')
  remove(@Param('id') id: string) {
    return this.newsletter.remove(id);
  }
}
