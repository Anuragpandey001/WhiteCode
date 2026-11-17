import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsIn,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateJobDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsIn(['full-time', 'part-time', 'internship', 'contract', 'training'])
  employmentType?: string;

  @IsOptional()
  @IsString()
  experience?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  responsibilities?: string[];

  @IsOptional()
  @IsArray()
  requirements?: string[];

  @IsOptional()
  @IsString()
  salaryRange?: string;

  @IsOptional()
  @IsNumber()
  openings?: number;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsOptional()
  @IsBoolean()
  published?: boolean;
}

export class UpdateJobDto extends PartialType(CreateJobDto) {}

export class CreateApplicationDto {
  @IsMongoId()
  job: string;

  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  resumeUrl?: string;

  @IsOptional()
  @IsString()
  portfolio?: string;

  @IsOptional()
  @IsString()
  coverLetter?: string;
}

export class UpdateApplicationDto {
  @IsIn(['applied', 'screening', 'interview', 'offer', 'hired', 'rejected'])
  status: string;
}
