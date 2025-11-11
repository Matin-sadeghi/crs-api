import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/user.dto';
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
  createUser(@Body() createUserDto: CreateUserDto): Promise<HttpResponseDto> {
    return this.userService.createUser(createUserDto);
  }
}
