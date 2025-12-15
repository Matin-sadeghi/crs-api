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
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/utils/enum';
import { HttpResponseDto } from 'src/utils/util.dto';
import {
  CreateProfessorDto,
  ProfessorResponseDto,
  UpdateProfessorDto,
} from '../dtos/professor.dto';
import { ProfessorService } from '../services/professor.service';
import { ProfessorDocument } from '../database/schema/professor.schema';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
@Controller('professor')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a professor' })
  @ApiResponse({
    type: HttpResponseDto,
  })
  create(@Body() dto: CreateProfessorDto): Promise<HttpResponseDto> {
    return this.professorService.createUser(dto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all professors' })
  @ApiResponse({
    type: ProfessorResponseDto,
    isArray: true,
  })
  getAllProfessors(): Promise<ProfessorDocument[]> {
    return this.professorService.getAllProfessors();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get one professor' })
  @ApiResponse({
    type: ProfessorResponseDto,
  })
  getProfessorById(@Param('id') id: string): Promise<ProfessorDocument> {
    return this.professorService.getProfessorById(id);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a professor' })
  @ApiResponse({
    type: HttpResponseDto,
  })
  deleteProfessor(@Param('id') id: string): Promise<HttpResponseDto> {
    return this.professorService.deleteProfessor(id);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a professor' })
  @ApiResponse({
    type: HttpResponseDto,
  })
  updateProfessor(
    @Param('id') id: string,
    @Body() updateProfessorDto: UpdateProfessorDto,
  ): Promise<HttpResponseDto> {
    return this.professorService.updateProfessor(id, updateProfessorDto);
  }
}
