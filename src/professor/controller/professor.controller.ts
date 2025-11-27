import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpResponseDto } from 'src/utils/util.dto';
import { ProfessorService } from '../services/professor.service';
import { CreateProfessorDto } from '../dtos/professor.dto';

@Controller('professor')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Post()
  @ApiOperation({ summary: 'Create a student' })
  @ApiResponse({
    type: HttpResponseDto,
  })
  create(@Body() dto: CreateProfessorDto): Promise<HttpResponseDto> {
    return this.professorService.createUser(dto);
  }
}
