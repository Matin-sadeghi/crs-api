import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
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

  @ApiProperty({ minLength: 10, maxLength: 20 })
  @IsString()
  @MinLength(10)
  @MaxLength(20)
  nationalId: string;

  @ApiProperty({ minLength: 10, maxLength: 12 })
  @IsString()
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
