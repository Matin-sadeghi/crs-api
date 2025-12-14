import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpResponseDto } from 'src/utils/util.dto';
import { CreateStudentDto } from '../dtos/student.dto';
import { StudentService } from '../services/student.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/utils/enum';

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
}
