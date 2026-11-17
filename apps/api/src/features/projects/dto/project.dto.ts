import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  client?: string;

  @IsString()
  summary: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsIn(['web', 'mobile', 'ai', 'ecommerce', 'marketing', 'video', 'branding'])
  type?: string;

  @IsOptional()
  @IsString()
  industry?: string;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsOptional()
  @IsArray()
  gallery?: string[];

  @IsOptional()
  @IsArray()
  technologies?: string[];

  @IsOptional()
  @IsArray()
  results?: { label: string; value: string }[];

  @IsOptional()
  @IsString()
  liveUrl?: string;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsBoolean()
  published?: boolean;

  @IsOptional()
  @IsDateString()
  completedAt?: string;
}

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
