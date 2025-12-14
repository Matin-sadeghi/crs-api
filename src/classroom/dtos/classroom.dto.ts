import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsOptional,
  Min,
  IsMongoId,
} from 'class-validator';

export class CreateClassroomDto {
  @ApiProperty({ example: '101', description: 'Room number' })
  @IsString()
  room_number!: string;

  @ApiProperty({ example: 30, description: 'Room capacity', minimum: 1 })
  @IsNumber()
  @Min(1)
  capacity!: number;

  @ApiProperty({ description: 'Faculty ID' })
  @IsMongoId()
  faculty!: string;
}

export class UpdateClassroomDto {
  @ApiProperty({ example: '101', required: false })
  @IsString()
  @IsOptional()
  room_number?: string;

  @ApiProperty({ example: 30, required: false, minimum: 1 })
  @IsNumber()
  @IsOptional()
  @Min(1)
  capacity?: number;

  @ApiProperty({ description: 'Faculty ID', required: false })
  @IsMongoId()
  @IsOptional()
  faculty?: string;
}

export class FacultyDto {
  @ApiProperty({ type: String })
  _id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty({ required: false })
  updatedAt?: Date;
}

export class ClassroomResponseDto {
  @ApiProperty({ type: String })
  _id!: string;

  @ApiProperty()
  room_number!: string;

  @ApiProperty()
  capacity!: number;

  @ApiProperty({
    type: FacultyDto,
    description: 'Faculty object (populated)',
  })
  faculty!: FacultyDto;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty({ required: false })
  updatedAt?: Date;
}
