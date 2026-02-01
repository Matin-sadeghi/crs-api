import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { FacultyResponseDto } from 'src/faculty/dtos/faculty.dto';
import { UserResponseDto } from 'src/user/dtos/user-response.dto';
import { UserGender } from 'src/utils/enum';

export class CreateProfessorDto {
  @ApiProperty({ minLength: 3 })
  @IsString()
  @MinLength(3)
  firstName!: string;

  @ApiProperty({ minLength: 3 })
  @IsString()
  @MinLength(3)
  lastName!: string;

  @ApiProperty({ enum: UserGender })
  @IsEnum(UserGender)
  gender!: UserGender;

  @ApiProperty({
    example: '0095017240',
    description: 'Iranian national ID (کد ملی) - 10 digits',
    minLength: 10,
    maxLength: 10,
  })
  @IsString()
  @Matches(/^\d{10}$/, {
    message: 'nationalId must be exactly 10 digits (Iranian national ID)',
  })
  @MinLength(10)
  @MaxLength(10)
  nationalId: string;

  @ApiProperty({
    example: '09123456789',
    description: 'Iranian mobile number (09xxxxxxxxx or +989xxxxxxxxx)',
    minLength: 10,
    maxLength: 12,
  })
  @IsString()
  @Matches(/^(\+98|0)?9[1-4]\d{8}$/, {
    message:
      'phone must be a valid Iranian mobile number (e.g. 09123456789 or +989123456789)',
  })
  @MinLength(10)
  @MaxLength(12)
  phone!: string;
  @ApiProperty({ minLength: 3 })
  @IsString()
  @MinLength(3)
  address!: string;

  @ApiProperty({ minLength: 3 })
  @IsString()
  @MinLength(3)
  password!: string;

  @ApiProperty({ minLength: 3 })
  @IsString()
  @MinLength(3)
  confirmPassword!: string;

  @ApiProperty({ minLength: 3, maxLength: 100 })
  @IsString()
  @IsOptional()
  faculty?: string;

  @ApiProperty({ required: true })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  education: string;
}

export class UpdateProfessorDto {
  @ApiProperty({ minLength: 3, required: false })
  @IsString()
  @IsOptional()
  @MinLength(3)
  firstName?: string;

  @ApiProperty({ minLength: 3, required: false })
  @IsString()
  @IsOptional()
  @MinLength(3)
  lastName?: string;

  @ApiProperty({ enum: UserGender, required: false })
  @IsEnum(UserGender)
  @IsOptional()
  gender?: UserGender;

  @ApiProperty({ minLength: 10, maxLength: 12, required: false })
  @IsString()
  @IsOptional()
  @MinLength(10)
  @MaxLength(12)
  phone?: string;

  @ApiProperty({ minLength: 3, required: false })
  @IsString()
  @IsOptional()
  @MinLength(3)
  address?: string;

  @ApiProperty({ minLength: 3, maxLength: 100, required: false })
  @IsString()
  @IsOptional()
  faculty?: string;

  @ApiProperty({ minLength: 3, maxLength: 100, required: false })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(100)
  education?: string;
}

export class ProfessorResponseDto {
  @ApiProperty({ type: String })
  _id!: string;

  @ApiProperty()
  user!: UserResponseDto;

  @ApiProperty()
  faculty!: FacultyResponseDto;

  @ApiProperty()
  education!: string;

  @ApiProperty()
  professorId!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty({ required: false })
  updatedAt?: Date;
}
