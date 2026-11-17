import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;

  /** free-text search across the feature's searchable fields */
  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @IsString()
  sort?: string = '-createdAt';

  @IsOptional()
  @IsIn(['true', 'false', 'all'])
  published?: 'true' | 'false' | 'all';
}

export interface Paginated<T> {
  items: T[];
  meta: { total: number; page: number; limit: number; pages: number };
}
