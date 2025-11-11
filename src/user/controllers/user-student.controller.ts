import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateStudentDto } from '../dtos/user-student.dto';
import { UserStudentService } from '../services/user-student.service';
import { HttpResponseDto } from '../utils/util.dto';

@Controller('/user/student')
export class UserStudentController {
  constructor(
    @Inject()
    private readonly userStudentService: UserStudentService,
  ) {}

  @Get()
  getAllUsers() {
    return this.userStudentService.getAllUsers();
  }
  @Post('create')
  @ApiResponse({
    type: HttpResponseDto,
  })
  createStudent(
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<HttpResponseDto> {
    return this.userStudentService.createUserStudent(createStudentDto);
  }
}
