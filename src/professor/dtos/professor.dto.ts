import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateProfessorDto as BaseCreateUserDto } from 'src/user/dtos/user-professor.dto'; // assuming a generic CreateUserDto for user

export class CreateProfessorDto extends BaseCreateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  officeNumber?: string;
}
