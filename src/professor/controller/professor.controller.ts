import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProfessorService } from '../services/professor.service';
import { CreateProfessorDto } from '../dtos/professor.dto';

@Controller('professor')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Post()
  create(@Body() dto: CreateProfessorDto) {
    return this.professorService.createUser(dto);
  }

  @Get()
  findAll() {
    return this.professorService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.professorService.findById(id);
  }
}
