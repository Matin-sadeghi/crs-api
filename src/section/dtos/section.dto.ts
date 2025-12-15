import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsOptional,
  Min,
  IsMongoId,
  IsArray,
  ValidateNested,
  IsEnum,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DayOfWeek } from 'src/utils/enum';
import { UserResponseDto } from 'src/user/dtos/user-response.dto';

export class ScheduleDto {
  @ApiProperty({
    enum: DayOfWeek,
    example: DayOfWeek.MONDAY,
    description: 'Day of the week',
  })
  @IsEnum(DayOfWeek)
  day_of_week!: DayOfWeek;

  @ApiProperty({ example: '08:00', description: 'Start time in HH:mm format' })
  @IsString()
  @Matches(/^([01][0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'start_time must be in HH:mm format (24-hour, e.g., 08:00, 14:30)',
  })
  start_time!: string;

  @ApiProperty({ example: '10:00', description: 'End time in HH:mm format' })
  @IsString()
  @Matches(/^([01][0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'endTime must be in HH:mm format (24-hour, e.g., 10:00, 16:45)',
  })
  endTime!: string;
}

export class CreateSectionDto {
  @ApiProperty({ description: 'Professor ID' })
  @IsString()
  professor!: string;

  @ApiProperty({ description: 'Classroom ID' })
  @IsString()
  classroom!: string;

  @ApiProperty({ description: 'Lesson ID' })
  @IsString()
  lesson!: string;

  @ApiProperty({
    type: [ScheduleDto],
    description: 'Array of schedules',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScheduleDto)
  schedules!: ScheduleDto[];

  @ApiProperty({ example: 30, description: 'Section capacity', minimum: 1 })
  @IsNumber()
  @Min(1)
  capacity!: number;
}

export class UpdateSectionDto {
  @ApiProperty({ description: 'Professor ID', required: false })
  @IsMongoId()
  @IsOptional()
  professor?: string;

  @ApiProperty({ description: 'Classroom ID', required: false })
  @IsMongoId()
  @IsOptional()
  classroom?: string;

  @ApiProperty({ description: 'Lesson ID', required: false })
  @IsMongoId()
  @IsOptional()
  lesson?: string;

  @ApiProperty({
    type: [ScheduleDto],
    required: false,
    description: 'Array of schedules',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScheduleDto)
  @IsOptional()
  schedules?: ScheduleDto[];

  @ApiProperty({ example: 30, required: false, minimum: 1 })
  @IsNumber()
  @IsOptional()
  @Min(1)
  capacity?: number;
}

export class ProfessorDto {
  @ApiProperty({ type: String })
  _id!: string;

  @ApiProperty()
  professorId!: string;
  @ApiProperty()
  education!: string;
  @ApiProperty()
  faculty: string;
  @ApiProperty()
  user: string;
}

export class ClassroomDto {
  @ApiProperty({ type: String })
  _id!: string;

  @ApiProperty()
  room_number!: string;

  @ApiProperty()
  capacity!: number;
}

export class LessonDto {
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
}

export class StudentDto {
  @ApiProperty({ type: String })
  _id!: string;

  @ApiProperty()
  studentId!: string;
}

export class ScheduleResponseDto {
  @ApiProperty({ enum: DayOfWeek })
  day_of_week!: DayOfWeek;

  @ApiProperty()
  start_time!: string;

  @ApiProperty()
  endTime!: string;
}

export class SectionResponseDto {
  @ApiProperty({ type: String })
  _id!: string;

  @ApiProperty({ type: ProfessorDto })
  professor!: ProfessorDto;

  @ApiProperty({ type: UserResponseDto })
  professorUser!: UserResponseDto;

  @ApiProperty({ type: ClassroomDto })
  classroom!: ClassroomDto;

  @ApiProperty({ type: LessonDto })
  lesson!: LessonDto;

  @ApiProperty({ type: [StudentDto], required: false })
  students?: StudentDto[];

  @ApiProperty({ type: [ScheduleResponseDto] })
  schedules!: ScheduleResponseDto[];

  @ApiProperty()
  capacity!: number;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty({ required: false })
  updatedAt?: Date;
}
