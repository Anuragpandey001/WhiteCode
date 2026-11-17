import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from './models/user.model';
import {
  ChangePasswordDto,
  CreateUserDto,
  LoginDto,
  UpdateUserDto,
} from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwt: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.userModel
      .findOne({ email: dto.email.toLowerCase() })
      .select('+password')
      .exec();

    if (!user) throw new UnauthorizedException('Invalid email or password');
    if (!user.active) throw new UnauthorizedException('This account is disabled');

    const ok = await user.comparePassword(dto.password);
    if (!ok) throw new UnauthorizedException('Invalid email or password');

    user.lastLoginAt = new Date();
    await user.save();

    return {
      token: this.sign(user),
      user: this.sanitize(user),
    };
  }

  async profile(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('User not found');
    return this.sanitize(user);
  }

  async listUsers() {
    return this.userModel.find().sort('-createdAt').lean().exec();
  }

  async createUser(dto: CreateUserDto) {
    const exists = await this.userModel.exists({ email: dto.email.toLowerCase() });
    if (exists) throw new BadRequestException('A user with this email already exists');
    const user = await this.userModel.create(dto);
    return this.sanitize(user);
  }

  async updateUser(id: string, dto: UpdateUserDto) {
    const user = await this.userModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!user) throw new NotFoundException('User not found');
    return this.sanitize(user);
  }

  async removeUser(id: string, currentUserId: string) {
    if (id === currentUserId)
      throw new BadRequestException('You cannot delete your own account');
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) throw new NotFoundException('User not found');
    return { id, deleted: true };
  }

  async changePassword(id: string, dto: ChangePasswordDto) {
    const user = await this.userModel.findById(id).select('+password').exec();
    if (!user) throw new NotFoundException('User not found');

    const ok = await user.comparePassword(dto.currentPassword);
    if (!ok) throw new BadRequestException('Current password is incorrect');

    user.password = dto.newPassword;
    await user.save();
    return { updated: true };
  }

  private sign(user: User) {
    return this.jwt.sign({
      sub: String(user._id),
      email: user.email,
      role: user.role,
    });
  }

  private sanitize(user: User) {
    return {
      id: String(user._id),
      name: user.name,
      email: user.email,
      role: user.role,
      active: user.active,
      avatar: user.avatar,
      lastLoginAt: user.lastLoginAt,
    };
  }
}
