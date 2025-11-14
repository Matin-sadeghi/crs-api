import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateStudentDto } from '../dtos/user-student.dto';
import { HttpResponseDto } from '../../utils/util.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { User } from 'src/utils/decorators/auth.decorator';
import { UserRole } from 'src/utils/enum';
import { UserDocument } from '../database/schema/user.schema';

@Controller('/user')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class UserController {
  constructor(
    @Inject()
    private readonly userService: UserService,
  ) {}

  @Get()
  @Roles(UserRole.ADMIN)
  getAllUsers(@User() user: UserDocument) {
    // Only ADMIN or TEACHER can access
    // User is available from req.user
    console.log('Requested by:', user);
    return this.userService.getAllUsers();
  }

  @Post('create')
  @ApiResponse({
    type: HttpResponseDto,
  })
  createUser(
    @Body() createUserDto: CreateStudentDto,
    @User() currentUser: UserDocument,
  ): Promise<HttpResponseDto> {
    // Access current logged-in user
    console.log('Created by:', currentUser.firstName);
    return this.userService.createUser(createUserDto);
  }
}
