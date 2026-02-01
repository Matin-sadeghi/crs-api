import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { UserGender } from 'src/utils/enum';

export class CreateStudentDto {
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

  @ApiProperty({ required: false })
  @IsString()
  majorCode: string;
}

export class UpdateStudentDto {
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

  @ApiProperty({ required: false, default: 12 })
  @IsNumber()
  @IsOptional()
  minUnit?: number;

  @ApiProperty({ required: false, default: 20 })
  @IsNumber()
  @IsOptional()
  maxUnit?: number;
}

export class StudentResponseDto {
  @ApiProperty({ type: String })
  _id!: string;

  @ApiProperty()
  studentId!: string;

  @ApiProperty({ type: String })
  major!: string;

  @ApiProperty({ type: String })
  user!: string;

  @ApiProperty({ required: false, default: 12 })
  minUnit!: number;

  @ApiProperty({ required: false, default: 20 })
  maxUnit!: number;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty({ required: false })
  updatedAt?: Date;
}

export class AddLessonPassedDto {
  @ApiProperty({ example: '4010250001', description: 'Student ID' })
  @IsString()
  @MinLength(1)
  studentId!: string;

  @ApiProperty({ example: '4010250001', description: 'Lesson ID' })
  @IsString()
  @MinLength(1)
  lessonId!: string;
}
