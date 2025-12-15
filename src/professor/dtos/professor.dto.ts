import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
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
