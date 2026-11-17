import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

export class UpdateSettingDto {
  @IsOptional()
  @IsString()
  brandName?: string;

  @IsOptional()
  @IsString()
  tagline?: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsObject()
  contact?: Record<string, string>;

  @IsOptional()
  @IsObject()
  socials?: Record<string, string>;

  @IsOptional()
  @IsArray()
  stats?: { label: string; value: string }[];

  @IsOptional()
  @IsObject()
  hero?: Record<string, string>;

  @IsOptional()
  @IsObject()
  seo?: Record<string, any>;

  @IsOptional()
  @IsObject()
  analytics?: Record<string, string>;

  @IsOptional()
  @IsArray()
  clientLogos?: string[];
}
