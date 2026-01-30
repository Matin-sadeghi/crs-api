import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/utils/enum';
import { SearchDto as FilterDto, HttpResponseDto } from 'src/utils/util.dto';
import { User } from 'src/utils/decorators/auth.decorator';
import { UserDocument } from 'src/user/database/schema/user.schema';
import { SectionDocument } from '../database/schema/section.schema';
import {
  CreateSectionDto,
  SectionResponseDto,
  UpdateSectionDto,
} from '../dtos/section.dto';
import { SectionService } from '../services/section.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('/section')
@ApiBearerAuth('JWT-auth')
export class SectionController {
  constructor(
    @Inject()
    private readonly sectionService: SectionService,
  ) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.STUDENT, UserRole.PROFESSOR)
  @ApiOperation({ summary: 'Get all sections' })
  @ApiResponse({
    type: SectionResponseDto,
    isArray: true,
  })
  getAllSections(
    @Query()
    filter: FilterDto,
  ): Promise<SectionDocument[]> {
    return this.sectionService.getAllSections(filter?.search ?? '');
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.STUDENT, UserRole.PROFESSOR)
  @ApiOperation({ summary: 'Get one section' })
  @ApiResponse({
    type: SectionResponseDto,
  })
  getOneSection(@Param('id') id: string): Promise<SectionDocument> {
    return this.sectionService.getOneSection(id);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new section' })
  @ApiResponse({
    type: HttpResponseDto,
  })
  createSection(
    @Body() createSectionDto: CreateSectionDto,
  ): Promise<HttpResponseDto> {
    return this.sectionService.createSection(createSectionDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a section' })
  @ApiResponse({
    type: HttpResponseDto,
  })
  deleteSection(@Param('id') id: string): Promise<HttpResponseDto> {
    return this.sectionService.deleteSection(id);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a section' })
  @ApiResponse({
    type: HttpResponseDto,
  })
  updateSection(
    @Param('id') id: string,
    @Body() updateSectionDto: UpdateSectionDto,
  ): Promise<HttpResponseDto> {
    return this.sectionService.updateSection(id, updateSectionDto);
  }

  @Post(':id/enroll')
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'Enroll student in a section' })
  @ApiResponse({
    type: HttpResponseDto,
  })
  async enrollInSection(
    @Param('id') sectionId: string,
    @User() user: UserDocument,
  ): Promise<HttpResponseDto> {
    const studentId = user.student.toString();
    return await this.sectionService.enrollStudent(sectionId, studentId);
  }

  @Get('professor/my-sections')
  @Roles(UserRole.PROFESSOR)
  @ApiOperation({ summary: 'Get all sections of the logged-in professor' })
  @ApiResponse({
    type: SectionResponseDto,
    isArray: true,
  })
  async getMySections(@User() user: UserDocument): Promise<SectionDocument[]> {
    const professorId = user.professor.toString();
    return await this.sectionService.getSectionsByProfessor(professorId);
  }

  @Get('student/my-sections')
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'Get all sections of the logged-in student' })
  @ApiResponse({
    type: SectionResponseDto,
    isArray: true,
  })
  async getMyStudentSections(
    @User() user: UserDocument,
  ): Promise<SectionDocument[]> {
    const studentId = user.student.toString();
    return this.sectionService.getSectionsByStudent(studentId);
  }

  @Delete(':sectionId/student/:studentId')
  @Roles(UserRole.PROFESSOR)
  @ApiOperation({ summary: 'Professor removes a student from a section' })
  @ApiResponse({ type: HttpResponseDto })
  removeStudentFromSection(
    @Param('sectionId') sectionId: string,
    @Param('studentId') studentId: string,
    @User() user: UserDocument,
  ): Promise<HttpResponseDto> {
    const professorId = user.professor.toString();
    return this.sectionService.removeStudentFromSection(
      sectionId,
      studentId,
      professorId,
    );
  }

  @Delete(':sectionId/drop')
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'Student drops a section' })
  @ApiResponse({ type: HttpResponseDto })
  async dropSection(
    @Param('sectionId') sectionId: string,
    @User() user: UserDocument,
  ): Promise<HttpResponseDto> {
    const studentId = user.student.toString();
    return await this.sectionService.studentDropSection(sectionId, studentId);
  }
}
