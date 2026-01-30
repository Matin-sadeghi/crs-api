import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  MinLength,
  IsOptional,
  IsEnum,
  Min,
  Max,
  IsArray,
} from 'class-validator';
import { LessonType } from 'src/utils/enum';

export class CreateLessonDto {
  @ApiProperty({ example: '4010250001', description: 'Custom lesson ID' })
  @IsString()
  lessonId!: string;

  @ApiProperty({ minLength: 3 })
  @IsString()
  @MinLength(3)
  title!: string;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  prerequisite?: string[];

  @ApiProperty({ type: Number, minimum: 1, maximum: 6 })
  @IsNumber()
  @Min(1)
  @Max(6)
  unit!: number;

  @ApiProperty({
    enum: LessonType,
  })
  @IsEnum(LessonType)
  type!: LessonType;

  @ApiProperty({
    example: 'Computer Engineering',
    description: 'Educational field / department',
  })
  @IsString()
  @IsOptional()
  field: string;
}

export class UpdateLessonDto {
  @ApiProperty({ example: '4010250001', required: false })
  @IsString()
  @IsOptional()
  lessonId?: string;

  @ApiProperty({ minLength: 3, required: false })
  @IsString()
  @IsOptional()
  @MinLength(3)
  title?: string;

  @ApiProperty({ type: Number, required: false, minimum: 1, maximum: 6 })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(6)
  unit?: number;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  prerequisite?: string[];

  @ApiProperty({
    enum: LessonType,
  })
  @IsEnum(LessonType)
  type!: LessonType;

  @ApiProperty({
    example: 'Computer Engineering',
    required: false,
  })
  @IsString()
  @IsOptional()
  field?: string;
}

export class PrerequisiteLessonDto {
  @ApiProperty({ type: String })
  _id!: string;

  @ApiProperty()
  lessonId!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  unit!: number;

  @ApiProperty()
  type!: string;

  @ApiProperty()
  field!: string;

  @ApiProperty()
  createdAt!: Date;
}

export class LessonResponseDto {
  @ApiProperty({ type: String })
  _id!: string;

  @ApiProperty()
  lessonId!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  unit!: number;

  @ApiProperty()
  type!: string;

  @ApiProperty({
    type: [PrerequisiteLessonDto],
    required: false,
    description: 'Array of prerequisite lesson objects (populated)',
  })
  prerequisite?: PrerequisiteLessonDto[];

  @ApiProperty()
  field!: string;

  @ApiProperty()
  createdBy!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty({ required: false })
  updatedAt?: Date;
}

export class LessonWithUserResponseDto {
  @ApiProperty({ type: String })
  _id!: string;

  @ApiProperty()
  lessonId!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  unit!: number;

  @ApiProperty()
  type!: string;

  @ApiProperty({
    type: [PrerequisiteLessonDto],
    required: false,
    description: 'Array of prerequisite lesson objects (populated)',
  })
  prerequisite?: PrerequisiteLessonDto[];

  @ApiProperty()
  field!: string;

  @ApiProperty({ description: 'Full user object when populated' })
  createdBy!: any; // can replace with UserResponseDto if you prefer

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty({ required: false })
  updatedAt?: Date;
}
