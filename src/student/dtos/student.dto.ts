import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateStudentDto as BaseCreateStudentDto } from 'src/user/dtos/user-student.dto';

export class CreateStudentDto extends BaseCreateStudentDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  grade?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  major?: string;
}
