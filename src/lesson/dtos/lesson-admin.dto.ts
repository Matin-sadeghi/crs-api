import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MinLength, IsOptional } from 'class-validator';


export class CreateLessonDto {
  @ApiProperty({ example: '4010250001', description: 'Custom lesson ID' })
  @IsString()
  lessonId!: string;

  @ApiProperty({ minLength: 3 })
  @IsString()
  @MinLength(3)
  title!: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  unit!: number;

  @ApiProperty({
    example: 'Mandatory',
    description: 'Lesson type',
  })
  @IsString()
  type!: string;

  @ApiProperty({
    example: 'Computer Engineering',
    description: 'Educational field / department',
  })
  @IsString()
  field!: string;
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

  @ApiProperty({ type: Number, required: false })
  @IsNumber()
  @IsOptional()
  unit?: number;

  @ApiProperty({
    example: 'Mandatory',
    required: false,
  })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiProperty({
    example: 'Computer Engineering',
    required: false,
  })
  @IsString()
  @IsOptional()
  field?: string;
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

  @ApiProperty()
  field!: string;

  @ApiProperty({ description: 'Full user object when populated' })
  createdBy!: any; // can replace with UserResponseDto if you prefer

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty({ required: false })
  updatedAt?: Date;
}
