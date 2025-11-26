import { Injectable, Inject } from '@nestjs/common';
import { ProfessorRepository } from '../database/repository/professor.repository';
import { CreateProfessorDto } from '../dtos/professor.dto';
import { HttpResponseDto } from '../../utils/util.dto';

@Injectable()
export class ProfessorService {
  constructor(
    @Inject('PROFESSOR_REPOSITORY')
    private readonly professorRepository: ProfessorRepository,
  ) {}

  async createUser(createProfessorDto: CreateProfessorDto): Promise<HttpResponseDto> {
    // Role is handled in the repository
    await this.professorRepository.create(createProfessorDto);
    return { status: 201, message: 'Professor created successfully' };
  }

  async findAll() {
    return this.professorRepository.findAll();
  }

  async findById(id: string) {
    return this.professorRepository.findById(id);
  }
}
