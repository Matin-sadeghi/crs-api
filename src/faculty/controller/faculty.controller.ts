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
import { FacultyService } from '../services/faculty.service';
import {
  CreateFacultyDto,
  FacultyResponseDto,
  UpdateFacultyDto,
} from '../dtos/faculty.dto';
import { FacultyDocument } from '../database/schema/faculty.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/utils/enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
@Controller('faculty')
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a faculty' })
  @ApiResponse({
    type: HttpResponseDto,
  })
  create(@Body() dto: CreateFacultyDto): Promise<HttpResponseDto> {
    return this.facultyService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all faculties' })
  @ApiResponse({
    type: FacultyResponseDto,
    isArray: true,
  })
  getAllFaculties(): Promise<FacultyDocument[]> {
    return this.facultyService.getAllFaculties();
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a faculty' })
  @ApiResponse({
    type: HttpResponseDto,
  })
  deleteFaculty(@Param('id') id: string): Promise<HttpResponseDto> {
    return this.facultyService.deleteFaculty(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a faculty by id' })
  @ApiResponse({
    type: FacultyResponseDto,
  })
  getFacultyById(@Param('id') id: string): Promise<FacultyDocument> {
    return this.facultyService.getFacultyById(id);
  }
  @Put(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a faculty' })
  @ApiResponse({
    type: HttpResponseDto,
  })
  updateFaculty(
    @Param('id') id: string,
    @Body() updateFacultyDto: UpdateFacultyDto,
  ): Promise<HttpResponseDto> {
    return this.facultyService.updateFaculty(id, updateFacultyDto);
  }
}
