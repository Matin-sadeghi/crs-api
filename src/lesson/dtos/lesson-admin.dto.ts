import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MinLength } from 'class-validator';

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
