import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateStudentDto } from '../dtos/user-student.dto';
import { HttpResponseDto } from '../utils/util.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('/user')
export class UserController {
  constructor(
    @Inject()
    private readonly userService: UserService,
  ) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }
  @Post('create')
  @ApiResponse({
    type: HttpResponseDto,
  })
  createUser(
    @Body() createUserDto: CreateStudentDto,
  ): Promise<HttpResponseDto> {
    return this.userService.createUser(createUserDto);
  }
}
