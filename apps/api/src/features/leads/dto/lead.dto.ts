import {
  IsEmail,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateLeadDto {
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(25)
  phone?: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  service?: string;

  @IsOptional()
  @IsString()
  budget?: string;

  @IsOptional()
  @IsString()
  timeline?: string;

  @IsString()
  @MinLength(10, { message: 'Tell us a little more about the project' })
  @MaxLength(4000)
  message: string;

  @IsOptional()
  @IsString()
  source?: string;
}

export class UpdateLeadDto {
  @IsOptional()
  @IsIn(['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'])
  status?: string;

  @IsOptional()
  @IsString()
  assignedTo?: string;

  @IsOptional()
  @IsNumber()
  dealValue?: number;
}

export class AddLeadNoteDto {
  @IsString()
  @MinLength(1)
  text: string;
}
