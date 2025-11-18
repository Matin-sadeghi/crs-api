import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserDocument } from 'src/user/database/schema/user.schema';
import { User } from 'src/utils/decorators/auth.decorator';
import { UserRole } from 'src/utils/enum';
import { LessonAdminService } from '../services/lesson-admin.service';
import {
  CreateLessonDto,
  UpdateLessonDto,
  LessonResponseDto,
} from '../dtos/lesson-admin.dto';
import { LessonDocument } from '../database/schema/lesson.schema';
import { HttpResponseDto } from 'src/utils/util.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('/lesson-admin')
@ApiBearerAuth('JWT-auth')
export class LessonAdminController {
  constructor(
    @Inject()
    private readonly lessonAdminService: LessonAdminService,
  ) {}
  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all lessons' })
  @ApiResponse({
    type: LessonResponseDto,
    isArray: true,
  })
  getAllLessons(): Promise<LessonDocument[]> {
    return this.lessonAdminService.getAllLessons();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get one lesson' })
  @ApiResponse({
    type: LessonResponseDto,
  })
  getOneLesson(@Param('id') id: string): Promise<LessonDocument> {
    return this.lessonAdminService.getOneLesson(id);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new lesson' })
  @ApiResponse({
    type: HttpResponseDto,
  })
  createLesson(
    @User() user: UserDocument,
    @Body() createLessonDto: CreateLessonDto,
  ): Promise<HttpResponseDto> {
    return this.lessonAdminService.createLesson(
      createLessonDto,
      user._id.toString(),
    );
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a lesson' })
  @ApiResponse({
    type: HttpResponseDto,
  })
  deleteLesson(@Param('id') id: string): Promise<HttpResponseDto> {
    return this.lessonAdminService.deleteLesson(id);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a lesson' })
  @ApiResponse({
    type: HttpResponseDto,
  })
  updateLesson(
    @Param('id') id: string,
    @Body() updateLessonDto: UpdateLessonDto,
  ): Promise<HttpResponseDto> {
    return this.lessonAdminService.updateLesson(id, updateLessonDto);
  }
}
