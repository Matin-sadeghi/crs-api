import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MinLength } from 'class-validator';
import { UserResponseDto } from 'src/user/dtos/user-response.dto';

export class CreateLessonDto {
  @ApiProperty({ minLength: 3 })
  @IsString()
  @MinLength(3)
  title!: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  unit!: number;
}

export class UpdateLessonDto {
  @ApiProperty({ minLength: 3 })
  @IsString()
  @MinLength(3)
  title!: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  unit!: number;
}

// Response DTO when createdBy is NOT populated (just an ID)
export class LessonResponseDto {
  @ApiProperty({ type: String, description: 'Lesson ID' })
  _id!: string;

  @ApiProperty({ minLength: 3, maxLength: 100, description: 'Lesson title' })
  title!: string;

  @ApiProperty({ type: Number, description: 'Unit number', default: 1 })
  unit!: number;

  @ApiProperty({
    type: String,
    description: 'User ID who created the lesson (when not populated)',
  })
  createdBy!: string;

  @ApiProperty({ type: Date, description: 'Creation date' })
  createdAt!: Date;

  @ApiProperty({ type: Date, description: 'Last update date', required: false })
  updatedAt?: Date;
}

// Response DTO when createdBy IS populated (full user object)
export class LessonWithUserResponseDto {
  @ApiProperty({ type: String, description: 'Lesson ID' })
  _id!: string;

  @ApiProperty({ minLength: 3, maxLength: 100, description: 'Lesson title' })
  title!: string;

  @ApiProperty({ type: Number, description: 'Unit number', default: 1 })
  unit!: number;

  @ApiProperty({
    type: UserResponseDto,
    description: 'User who created the lesson (populated)',
  })
  createdBy!: UserResponseDto;

  @ApiProperty({ type: Date, description: 'Creation date' })
  createdAt!: Date;

  @ApiProperty({ type: Date, description: 'Last update date', required: false })
  updatedAt?: Date;
}
