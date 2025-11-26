import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpResponseDto } from 'src/utils/util.dto';
import { CreateStudentDto } from '../dtos/student.dto';
import { StudentService } from '../services/student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a student' })
  @ApiResponse({
    type: HttpResponseDto,
  })
  create(@Body() dto: CreateStudentDto): Promise<HttpResponseDto> {
    return this.studentService.createUser(dto);
  }
}
