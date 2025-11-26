import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { StudentService } from '../services/student.service';
import { CreateStudentDto } from '../dtos/student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() dto: CreateStudentDto) {
    return this.studentService.createUser(dto);
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.studentService.findById(id);
  }
}
