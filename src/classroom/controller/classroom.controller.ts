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
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/utils/enum';
import { HttpResponseDto } from 'src/utils/util.dto';
import { ClassroomService } from '../services/classroom.service';
import {
  CreateClassroomDto,
  UpdateClassroomDto,
  ClassroomResponseDto,
} from '../dtos/classroom.dto';
import { ClassroomDocument } from '../database/schema/classroom.schema';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('/classroom')
@ApiBearerAuth('JWT-auth')
export class ClassroomController {
  constructor(
    @Inject()
    private readonly classroomService: ClassroomService,
  ) {}

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all classrooms' })
  @ApiResponse({
    type: ClassroomResponseDto,
    isArray: true,
  })
  getAllClassrooms(): Promise<ClassroomDocument[]> {
    return this.classroomService.getAllClassrooms();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get one classroom' })
  @ApiResponse({
    type: ClassroomResponseDto,
  })
  getOneClassroom(@Param('id') id: string): Promise<ClassroomDocument> {
    return this.classroomService.getOneClassroom(id);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new classroom' })
  @ApiResponse({
    type: HttpResponseDto,
  })
  createClassroom(
    @Body() createClassroomDto: CreateClassroomDto,
  ): Promise<HttpResponseDto> {
    return this.classroomService.createClassroom(createClassroomDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a classroom' })
  @ApiResponse({
    type: HttpResponseDto,
  })
  deleteClassroom(@Param('id') id: string): Promise<HttpResponseDto> {
    return this.classroomService.deleteClassroom(id);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a classroom' })
  @ApiResponse({
    type: HttpResponseDto,
  })
  updateClassroom(
    @Param('id') id: string,
    @Body() updateClassroomDto: UpdateClassroomDto,
  ): Promise<HttpResponseDto> {
    return this.classroomService.updateClassroom(id, updateClassroomDto);
  }
}
