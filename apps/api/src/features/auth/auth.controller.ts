import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ChangePasswordDto,
  CreateUserDto,
  LoginDto,
  UpdateUserDto,
} from './dto/auth.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('auth')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ---- public ----
  @Public()
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  // ---- authenticated ----
  @Get('me')
  me(@CurrentUser('id') id: string) {
    return this.authService.profile(id);
  }

  @Patch('me/password')
  changePassword(@CurrentUser('id') id: string, @Body() dto: ChangePasswordDto) {
    return this.authService.changePassword(id, dto);
  }

  // ---- admin user management ----
  @Get('users')
  @Roles('superadmin', 'admin')
  users() {
    return this.authService.listUsers();
  }

  @Post('users')
  @Roles('superadmin')
  createUser(@Body() dto: CreateUserDto) {
    return this.authService.createUser(dto);
  }

  @Patch('users/:id')
  @Roles('superadmin')
  updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.authService.updateUser(id, dto);
  }

  @Delete('users/:id')
  @Roles('superadmin')
  removeUser(@Param('id') id: string, @CurrentUser('id') currentUserId: string) {
    return this.authService.removeUser(id, currentUserId);
  }
}
