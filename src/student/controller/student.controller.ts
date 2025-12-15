import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpResponseDto } from 'src/utils/util.dto';
import {
  CreateStudentDto,
  StudentResponseDto,
  UpdateStudentDto,
} from '../dtos/student.dto';
import { StudentService } from '../services/student.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/utils/enum';
import { StudentDocument } from '../database/schema/student.schema';

@Controller('student')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a student' })
  @ApiResponse({
    type: HttpResponseDto,
  })
  create(@Body() dto: CreateStudentDto): Promise<HttpResponseDto> {
    return this.studentService.createUser(dto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all students' })
  @ApiResponse({
    type: StudentResponseDto,
    isArray: true,
  })
  getAllStudents(): Promise<StudentDocument[]> {
    return this.studentService.getAllStudents();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get one student' })
  @ApiResponse({
    type: StudentResponseDto,
  })
  getStudentById(@Param('id') id: string): Promise<StudentDocument> {
    return this.studentService.getStudentById(id);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a student' })
  @ApiResponse({
    type: HttpResponseDto,
  })
  deleteStudent(@Param('id') id: string): Promise<HttpResponseDto> {
    return this.studentService.deleteStudent(id);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a student' })
  @ApiResponse({
    type: HttpResponseDto,
  })
  updateStudent(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<HttpResponseDto> {
    return this.studentService.updateStudent(id, updateStudentDto);
  }
}
