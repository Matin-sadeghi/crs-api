import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

export class CreateMajorDto {
  @ApiProperty({ minLength: 3, maxLength: 100 })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  title!: string;

  @ApiProperty({ example: 'CS', description: 'Major code' })
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  code!: string;
}

export class UpdateMajorDto {
  @ApiProperty({ minLength: 3, maxLength: 100, required: false })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(100)
  title?: string;

  @ApiProperty({ example: 'CS', required: false })
  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(10)
  code?: string;
}

export class MajorResponseDto {
  @ApiProperty({ type: String })
  _id!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty({ required: false })
  updatedAt?: Date;
}
