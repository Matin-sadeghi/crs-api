import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { UserProfessorService } from 'src/user/services/user-professor.service';
import { HttpResponseDto } from '../../utils/util.dto';
import { CreateProfessorDto } from '../dtos/professor.dto';
import type { ProfessorRepositoryPort } from '../interface/professor.repository.port';
import { professorIdGenerator } from 'src/utils/id-generator';
import { FacultyService } from 'src/faculty/services/faculty.service';

@Injectable()
export class ProfessorService {
  constructor(
    @Inject('PROFESSOR_REPOSITORY')
    private readonly professorRepository: ProfessorRepositoryPort,
    private readonly userProfessorService: UserProfessorService,
    private readonly facultyService: FacultyService,
  ) {}

  async createUser(
    createProfessorDto: CreateProfessorDto,
  ): Promise<HttpResponseDto> {
    if (createProfessorDto?.faculty) {
      const faculty = await this.facultyService.getFacultyById(
        createProfessorDto.faculty,
      );
      if (!faculty) {
        throw new BadRequestException('Faculty not found');
      }
    }
    const lastProfessor = await this.professorRepository.findLast();
    const professorId = professorIdGenerator(lastProfessor?.professorId);

    const professor = new Types.ObjectId();
    const { data } = await this.userProfessorService.createProfessorUser({
      ...createProfessorDto,
      username: professorId,
      professor,
    });
    if (!data?._id) {
      throw new BadRequestException('User not created');
    }
    await this.professorRepository.create(
      {
        faculty: createProfessorDto.faculty,
        education: createProfessorDto.education,
        professorId,
        user: data._id,
      },
      professor,
    );

    return {
      status: HttpStatus.CREATED,
      message: 'Professor created successfully',
    };
  }
}
