import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CreateStudentDto } from '../dtos/user-student.dto';
import { UserStudentService } from '../services/user-student.service';
import { HttpResponseDto } from '../../utils/util.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { User } from 'src/utils/decorators/auth.decorator';
import { UserRole } from 'src/utils/enum';
import { UserDocument } from '../database/schema/user.schema';

@Controller('/user/student')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UserStudentController {
  constructor(
    @Inject()
    private readonly userStudentService: UserStudentService,
  ) {}

  @Post('create')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiResponse({
    type: HttpResponseDto,
  })
  createStudent(
    @Body() createStudentDto: CreateStudentDto,
    @User() currentUser: UserDocument,
  ): Promise<HttpResponseDto> {
    // Only ADMIN can create students
    // Access current user info
    console.log('Student created by admin:', currentUser.firstName);
    return this.userStudentService.createUserStudent(createStudentDto);
  }

  @Get('profile')
  getMyProfile(@User() user: UserDocument) {
    // Get current user's profile
    return {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      username: user.username,
      status: user.status,
    };
  }

  @Get('my-role')
  getMyRole(@User('role') role: UserRole) {
    // Extract specific property from user
    return { role };
  }
}
